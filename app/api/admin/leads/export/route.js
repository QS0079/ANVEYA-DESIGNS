import { query } from "@/lib/db";
import { dateRange } from "@/lib/leadRange";

export const dynamic = "force-dynamic";

const esc = (v) => {
  const s = v == null ? "" : v instanceof Date ? v.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET(req) {
  // same filters as the Leads table (search, status, type, month / date range)
  const sp = req.nextUrl.searchParams;
  const where = [];
  const params = [];
  const q = (sp.get("q") || "").trim();
  if (q) {
    where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR location LIKE ? OR message LIKE ? OR timeline LIKE ?)");
    params.push(...Array(6).fill(`%${q}%`));
  }
  if (sp.get("status")) { where.push("status = ?"); params.push(sp.get("status")); }
  if (sp.get("type")) { where.push("property_type = ?"); params.push(sp.get("type")); }
  const dr = dateRange(sp);
  where.push(...dr.where); params.push(...dr.params);
  const w = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const rows = await query(`SELECT * FROM leads ${w} ORDER BY created_at DESC`, params);
  const cols = ["id", "created_at", "name", "email", "phone", "location", "property_type", "service", "budget", "timeline", "message", "status", "notes", "source_page"];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="anveya-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
