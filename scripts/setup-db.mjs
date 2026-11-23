// Creates the ANEYA database, tables and admin user.
// Usage: npm run db:setup   (reads DB settings from .env.local)
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const envFile = [".env.local", ".env"].map((f) => path.resolve(f)).find((f) => fs.existsSync(f));
if (envFile) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const DB = process.env.DB_NAME || "ANEYA";
const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
});

try {
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
} catch (e) {
  console.warn("CREATE DATABASE skipped (create it in your hosting panel):", e.code || e.message);
}
await conn.query(`USE \`${DB}\``);
await conn.query(fs.readFileSync(path.resolve("database/schema.sql"), "utf8"));
// upgrade tables created by earlier versions
await conn.query(`USE \`${DB}\``);
const [cols] = await conn.query("SELECT COLUMN_NAME, IS_NULLABLE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'");
const has = Object.fromEntries(cols.map((c) => [c.COLUMN_NAME, c.IS_NULLABLE]));
if (!("timeline" in has)) await conn.query("ALTER TABLE leads ADD COLUMN timeline VARCHAR(80) NULL AFTER budget");
if (has.email === "NO") await conn.query("ALTER TABLE leads MODIFY email VARCHAR(190) NULL");
const [[tbl]] = await conn.query("SELECT TABLE_COLLATION AS c FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'");
if (tbl && !String(tbl.c).startsWith("utf8mb4")) await conn.query("ALTER TABLE leads CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

console.log(`✔ Database "${DB}" ready on ${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 3306} — tables created, admin user seeded.`);
await conn.end();
