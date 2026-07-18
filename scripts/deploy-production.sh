#!/usr/bin/env bash

set -Eeuo pipefail

SOURCE_DIR="${DEPLOY_PATH:-/opt/kasa/kasa-site}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-master}"
RELEASE_ROOT="${KASA_RELEASE_ROOT:-${SOURCE_DIR}-releases}"
SHARED_ROOT="${KASA_SHARED_ROOT:-${SOURCE_DIR}-shared}"
NGINX_SITE="${KASA_NGINX_SITE:-/etc/nginx/sites-enabled/codewithkasa}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
COMMIT="$(git -C "$SOURCE_DIR" rev-parse "origin/$DEPLOY_BRANCH")"
RELEASE_DIR="$RELEASE_ROOT/${STAMP}-${COMMIT:0:12}"
BACKUP_ROOT="/opt/kasa/backups"
CANDIDATE_NAME=""
CANDIDATE_PORT=""
CUTOVER_COMPLETE=false
NGINX_BACKUP=""

cleanup_failed_candidate() {
  if [[ "$CUTOVER_COMPLETE" != "true" && -n "$CANDIDATE_NAME" ]]; then
    pm2 delete "$CANDIDATE_NAME" >/dev/null 2>&1 || true
  fi
}

rollback_cutover() {
  if [[ -n "$NGINX_BACKUP" && -f "$NGINX_BACKUP" ]]; then
    sudo cp "$NGINX_BACKUP" "$NGINX_SITE"
    sudo nginx -t
    sudo systemctl reload nginx
  fi
  cleanup_failed_candidate
}

trap cleanup_failed_candidate ERR

mkdir -p "$RELEASE_ROOT" "$SHARED_ROOT/uploads" "$BACKUP_ROOT"
chmod 700 "$BACKUP_ROOT"

mkdir "$RELEASE_DIR"
git -C "$SOURCE_DIR" archive "$COMMIT" | tar -x -C "$RELEASE_DIR"

if [[ ! -f "$SOURCE_DIR/.env" ]]; then
  echo "Production environment file is missing: $SOURCE_DIR/.env" >&2
  exit 1
fi

ln -s "$SOURCE_DIR/.env" "$RELEASE_DIR/.env"
mkdir -p "$RELEASE_DIR/public"
if [[ -d "$SOURCE_DIR/public/uploads" && -z "$(find "$SHARED_ROOT/uploads" -mindepth 1 -print -quit)" ]]; then
  rsync -a "$SOURCE_DIR/public/uploads/" "$SHARED_ROOT/uploads/"
fi
ln -s "$SHARED_ROOT/uploads" "$RELEASE_DIR/public/uploads"

cd "$RELEASE_DIR"
npm ci
npx prisma generate
npx prisma validate

export DEPLOYMENT_VERSION="$COMMIT"
npm run build

DATABASE_URL="$(node -r dotenv/config -e 'process.stdout.write(process.env.DATABASE_URL || "")')"
if [[ -z "$DATABASE_URL" ]]; then
  echo "DATABASE_URL is missing from the production environment." >&2
  exit 1
fi

CLEAN_DATABASE_URL="$(node -e 'const u = new URL(process.argv[1]); u.search = ""; process.stdout.write(u.toString())' "$DATABASE_URL")"
DB_BACKUP="$BACKUP_ROOT/kasa-before-${STAMP}-${COMMIT:0:12}.dump"
pg_dump --format=custom --no-owner --no-acl --file="$DB_BACKUP" "$CLEAN_DATABASE_URL"
chmod 600 "$DB_BACKUP"
sha256sum "$DB_BACKUP"

HAS_PLATFORM_TABLES="$(psql "$CLEAN_DATABASE_URL" -Atqc "SELECT to_regclass('public.\"Article\"') IS NOT NULL")"
HAS_MIGRATION_HISTORY="$(psql "$CLEAN_DATABASE_URL" -Atqc "SELECT to_regclass('public.\"_prisma_migrations\"') IS NOT NULL")"
if [[ "$HAS_PLATFORM_TABLES" == "t" && "$HAS_MIGRATION_HISTORY" == "f" ]]; then
  DATABASE_URL="$DATABASE_URL" npx prisma migrate resolve \
    --applied 20260718181500_unified_platform_baseline
fi

DATABASE_URL="$DATABASE_URL" npx prisma migrate deploy

CURRENT_PORT="$(sudo sed -n 's/.*proxy_pass http:\/\/127\.0\.0\.1:\([0-9][0-9]*\);.*/\1/p' "$NGINX_SITE" | head -1)"
if [[ "$CURRENT_PORT" == "3011" ]]; then
  CANDIDATE_PORT="3012"
else
  CANDIDATE_PORT="3011"
fi
CANDIDATE_NAME="kasa-site-${CANDIDATE_PORT}"

pm2 delete "$CANDIDATE_NAME" >/dev/null 2>&1 || true
PORT="$CANDIDATE_PORT" NODE_ENV=production DEPLOYMENT_VERSION="$COMMIT" \
  pm2 start npm --name "$CANDIDATE_NAME" --cwd "$RELEASE_DIR" -- start

candidate_healthy=false
for _ in $(seq 1 30); do
  if curl --fail --silent --show-error --max-time 5 "http://127.0.0.1:${CANDIDATE_PORT}/" >/dev/null; then
    candidate_healthy=true
    break
  fi
  sleep 2
done

if [[ "$candidate_healthy" != "true" ]]; then
  echo "Candidate failed its local health check on port $CANDIDATE_PORT." >&2
  exit 1
fi

NGINX_BACKUP="$BACKUP_ROOT/codewithkasa-${STAMP}.nginx"
sudo cp "$NGINX_SITE" "$NGINX_BACKUP"
sudo sed -i "s#proxy_pass http://127.0.0.1:${CURRENT_PORT};#proxy_pass http://127.0.0.1:${CANDIDATE_PORT};#" "$NGINX_SITE"
sudo nginx -t
sudo systemctl reload nginx

if ! curl --fail --silent --show-error --max-time 15 https://www.getkasa.in/ >/dev/null; then
  echo "Public health check failed after cutover; restoring nginx." >&2
  rollback_cutover
  exit 1
fi

CUTOVER_COMPLETE=true
trap - ERR

if [[ "$CURRENT_PORT" == "3001" ]]; then
  pm2 delete kasa-site >/dev/null 2>&1 || true
elif [[ "$CURRENT_PORT" == "3011" ]]; then
  pm2 delete kasa-site-3011 >/dev/null 2>&1 || true
else
  pm2 delete kasa-site-3012 >/dev/null 2>&1 || true
fi

pm2 save
echo "Deployed $COMMIT on port $CANDIDATE_PORT from $RELEASE_DIR"
