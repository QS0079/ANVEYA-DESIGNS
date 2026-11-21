import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [t] = await query("SELECT COUNT(*) AS c FROM leads");
  const [n] = await query("SELECT COUNT(*) AS c FROM leads WHERE status = 'new'");
  const [w] = await query("SELECT COUNT(*) AS c FROM leads WHERE created_at >= NOW() - INTERVAL 7 DAY");
  const [f] = await query("SELECT COUNT(*) AS c FROM faqs WHERE is_active = 1");
  const byStatus = await query("SELECT status, COUNT(*) AS c FROM leads GROUP BY status");
  const byType = await query("SELECT COALESCE(NULLIF(property_type,''),'Not specified') AS t, COUNT(*) AS c FROM leads GROUP BY t");
  const recent = await query("SELECT id, name, phone, property_type, status, created_at FROM leads ORDER BY created_at DESC LIMIT 6");
  return NextResponse.json({
    total: Number(t.c), fresh: Number(n.c), week: Number(w.c), faqs: Number(f.c),
    byStatus, byType, recent,
  });
}
