import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

const esc = (v) => {
  const s = v == null ? "" : v instanceof Date ? v.toISOString() : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  const rows = await query("SELECT * FROM leads ORDER BY created_at DESC");
  const cols = ["id", "created_at", "name", "email", "phone", "location", "property_type", "service", "budget", "timeline", "message", "status", "notes", "source_page"];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="anveya-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
