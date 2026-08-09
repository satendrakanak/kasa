import { chmodSync, readFileSync, writeFileSync } from "node:fs";

const [siteEnvPath, releaseEnvPath, legacyEnvPath] = process.argv.slice(2);

if (!siteEnvPath || !releaseEnvPath || !legacyEnvPath) {
  throw new Error(
    "Usage: node scripts/prepare-production-env.mjs <site-env> <release-env> <legacy-env>",
  );
}

function parseEnv(path) {
  const values = {};
  for (const sourceLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = sourceLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function firstValue(...values) {
  return values.find((value) => typeof value === "string" && value.trim())?.trim() || "";
}

const current = parseEnv(siteEnvPath);
const release = parseEnv(releaseEnvPath);
const legacy = parseEnv(legacyEnvPath);
const databaseUrl = new URL(legacy.DATABASE_URL);
databaseUrl.pathname = "/kasa";
databaseUrl.searchParams.set("schema", "public");

const next = {
  DATABASE_URL: databaseUrl.toString(),
  AUTH_SECRET: firstValue(release.AUTH_SECRET),
  AUTH_TRUST_HOST: "true",
  AUTH_URL: "https://www.getkasa.in",
  SESSION_SECRET: firstValue(legacy.SESSION_SECRET, release.SESSION_SECRET),
  LICENSE_SIGNING_SECRET: firstValue(
    legacy.LICENSE_SIGNING_SECRET,
    release.LICENSE_SIGNING_SECRET,
  ),
  GEMINI_API_KEY: firstValue(current.GEMINI_API_KEY, release.GEMINI_API_KEY),
  GEMINI_MODEL: firstValue(release.GEMINI_MODEL, "gemini-2.5-flash"),
  GEMINI_FALLBACK_MODEL: firstValue(
    release.GEMINI_FALLBACK_MODEL,
    "gemini-2.5-flash-lite",
  ),
  OPENAI_API_KEY: firstValue(release.OPENAI_API_KEY),
  OPENAI_MODEL: firstValue(release.OPENAI_MODEL, "gpt-5.4-mini"),
  OPENAI_FALLBACK_MODEL: firstValue(release.OPENAI_FALLBACK_MODEL, "gpt-5-mini"),
  RESEND_API_KEY: firstValue(release.RESEND_API_KEY),
  LEADS_FROM_EMAIL: firstValue(release.LEADS_FROM_EMAIL),
  LEADS_NOTIFICATION_EMAIL: firstValue(release.LEADS_NOTIFICATION_EMAIL),
};

const required = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "LICENSE_SIGNING_SECRET",
  "GEMINI_API_KEY",
  "OPENAI_API_KEY",
  "RESEND_API_KEY",
  "LEADS_FROM_EMAIL",
  "LEADS_NOTIFICATION_EMAIL",
];
const missing = required.filter((key) => !next[key]);
if (missing.length) {
  throw new Error(`Missing required production variables: ${missing.join(", ")}`);
}

const output = [
  "# Managed production environment for getkasa.in",
  ...Object.entries(next).map(([key, value]) => `${key}=${JSON.stringify(value)}`),
  "",
].join("\n");

writeFileSync(siteEnvPath, output, { mode: 0o600 });
chmodSync(siteEnvPath, 0o600);
console.log(`Prepared ${Object.keys(next).length} production environment variables.`);
