import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { FAQS } from "./defaults";

const cfg = () => ({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ANEYA",
});

// Reuse one pool across hot reloads in dev
const g = globalThis;

export function getPool() {
  if (!g.__anveyaPool) {
    g.__anveyaPool = mysql.createPool({
      ...cfg(),
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
      dateStrings: false,
      // Talk to MySQL in UTC so lead timestamps are exact whatever time zone the
      // server or the database is set to (the admin shows them in IST).
      timezone: "Z",
    });
    g.__anveyaPool.pool.on("connection", (conn) => { conn.query("SET time_zone = '+00:00'"); });
  }
  return g.__anveyaPool;
}

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL DEFAULT 'Admin',
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(190) NULL,
    phone VARCHAR(40) NOT NULL,
    location VARCHAR(190) NULL,
    property_type VARCHAR(60) NULL,
    service VARCHAR(120) NULL,
    budget VARCHAR(80) NULL,
    timeline VARCHAR(80) NULL,
    message TEXT NULL,
    source_page VARCHAR(120) NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
];

async function createDatabaseIfMissing() {
  const { database, ...rest } = cfg();
  const conn = await mysql.createConnection(rest);
  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database.replace(/`/g, "")}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await conn.end();
  }
}

/** Upgrades tables created by earlier versions (safe to run every start). */
export async function migrate(pool) {
  const [cols] = await pool.query(
    "SELECT COLUMN_NAME, IS_NULLABLE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'"
  );
  const has = Object.fromEntries(cols.map((c) => [c.COLUMN_NAME, c.IS_NULLABLE]));
  if (!("timeline" in has)) await pool.query("ALTER TABLE leads ADD COLUMN timeline VARCHAR(80) NULL AFTER budget");
  if (has.email === "NO") await pool.query("ALTER TABLE leads MODIFY email VARCHAR(190) NULL");
  const [[tbl]] = await pool.query("SELECT TABLE_COLLATION AS c FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'");
  if (tbl && !String(tbl.c).startsWith("utf8mb4")) await pool.query("ALTER TABLE leads CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
}

async function runSetup() {
  try {
    await createDatabaseIfMissing();
  } catch (e) {
    // On shared hosting (e.g. Hostinger) the database is created in the control panel and the
    // DB user may not be allowed to run CREATE DATABASE — that's fine, carry on with the tables.
    console.warn("[db] CREATE DATABASE skipped:", e.code || e.message);
  }
  const pool = getPool();
  const [faqTable] = await pool.query("SHOW TABLES LIKE 'faqs'");
  const firstInstall = faqTable.length === 0;
  for (const sql of SCHEMA) await pool.query(sql);
  await migrate(pool);

  // The 6 FAQs from the content doc are added only when the FAQ table is first created.
  // After that the admin panel (Admin → FAQs) is the only source — deleted FAQs never come back.
  if (firstInstall) {
    for (let i = 0; i < FAQS.length; i++) {
      await pool.query("INSERT INTO faqs (question, answer, sort_order, is_active) VALUES (?, ?, ?, 1)", [FAQS[i].q, FAQS[i].a, i + 1]);
    }
  }

  const email = (process.env.ADMIN_EMAIL || "admin@anveya.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@anveya";
  const [admins] = await pool.query("SELECT id, email, password_hash FROM admin_users ORDER BY id LIMIT 1");
  if (admins.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)", [
      "Admin",
      email,
      hash,
    ]);
  } else {
    // The admin login always follows ADMIN_EMAIL / ADMIN_PASSWORD — change them and restart to update it.
    const a = admins[0];
    const same = a.email.toLowerCase() === email && (await bcrypt.compare(password, a.password_hash));
    if (!same) {
      const hash = await bcrypt.hash(password, 10);
      await pool.query("UPDATE admin_users SET email = ?, password_hash = ? WHERE id = ?", [email, hash, a.id]);
    }
  }
}

/** Creates the database, tables and seed data the first time it is called. */
export async function ensureDb() {
  if (!g.__anveyaReadyV2) {
    g.__anveyaReadyV2 = runSetup().catch((e) => {
      g.__anveyaReadyV2 = null;
      throw e;
    });
  }
  return g.__anveyaReadyV2;
}

export async function query(sql, params = []) {
  await ensureDb();
  const [rows] = await getPool().query(sql, params);
  return rows;
}
