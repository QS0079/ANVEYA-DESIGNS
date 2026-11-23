import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { IST_MONTH_SQL, dateRange, fillMonths } from "@/lib/leadRange";

export const dynamic = "force-dynamic";

const prevMonth = (ym) => {
  let [y, m] = ym.split("-").map(Number);
  m -= 1; if (m === 0) { m = 12; y -= 1; }
  return `${y}-${String(m).padStart(2, "0")}`;
};

/** Dashboard numbers. ?month=YYYY-MM limits everything to that month (IST); no month = all time. */
export async function GET(req) {
  const sp = req.nextUrl.searchParams;
  const month = /^\d{4}-\d{2}$/.test(sp.get("month") || "") ? sp.get("month") : "";
  const dr = dateRange(new URLSearchParams(month ? { month } : {}));
  const W = (extra) => {
    const parts = [...dr.where, ...(extra ? [extra] : [])];
    return parts.length ? `WHERE ${parts.join(" AND ")}` : "";
  };
  const P = dr.params;

  const [t] = await query(`SELECT COUNT(*) AS c FROM leads ${W()}`, P);
  const [n] = await query(`SELECT COUNT(*) AS c FROM leads ${W("status = 'new'")}`, P);
  const byStatus = await query(`SELECT status, COUNT(*) AS c FROM leads ${W()} GROUP BY status`, P);
  const byType = await query(`SELECT COALESCE(NULLIF(property_type,''),'Not specified') AS t, COUNT(*) AS c FROM leads ${W()} GROUP BY t ORDER BY c DESC`, P);
  const recent = await query(`SELECT id, name, phone, property_type, status, created_at FROM leads ${W()} ORDER BY created_at DESC, id DESC LIMIT 6`, P);
  const months = fillMonths(await query(`SELECT ${IST_MONTH_SQL} AS ym, COUNT(*) AS c FROM leads GROUP BY ym`));

  const out = { month, total: Number(t.c), fresh: Number(n.c), byStatus, byType, recent, months };
  if (month) {
    const won = byStatus.find((s) => s.status === "won");
    out.won = won ? Number(won.c) : 0;
    const pm = prevMonth(month);
    const pd = dateRange(new URLSearchParams({ month: pm }));
    const [p] = await query(`SELECT COUNT(*) AS c FROM leads WHERE ${pd.where.join(" AND ")}`, pd.params);
    out.prev = { month: pm, total: Number(p.c) };
  } else {
    const [w] = await query("SELECT COUNT(*) AS c FROM leads WHERE created_at >= NOW() - INTERVAL 7 DAY");
    const [m] = await query("SELECT COUNT(*) AS c FROM leads WHERE created_at >= NOW() - INTERVAL 30 DAY");
    out.week = Number(w.c);
    out.month30 = Number(m.c);
  }
  return NextResponse.json(out);
}
