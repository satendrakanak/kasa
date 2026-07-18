/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

const envPath = ".env";
const targetDatabase = process.argv[2];

if (!targetDatabase) {
  throw new Error("Usage: node scripts/update-env-db-name.cjs <database>");
}

let content = fs.readFileSync(envPath, "utf8");
content = content.replace(/^DATABASE_URL=(.+)$/m, (_line, value) => {
  let raw = value.trim();
  const quote = raw[0] === "\"" || raw[0] === "'" ? raw[0] : "";
  if (quote) raw = raw.slice(1, -1);

  const url = new URL(raw);
  url.pathname = `/${targetDatabase}`;
  const next = url.toString();

  return `DATABASE_URL=${quote ? `${quote}${next}${quote}` : next}`;
});

fs.writeFileSync(envPath, content);
console.log(`DATABASE_URL database changed to ${targetDatabase}`);
