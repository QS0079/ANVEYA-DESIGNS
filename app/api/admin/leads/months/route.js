import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { IST_MONTH_SQL, fillMonths } from "@/lib/leadRange";

export const dynamic = "force-dynamic";

/** All months (IST) from the first lead to this month, with how many leads came in each. */
export async function GET() {
  const rows = await query(`SELECT ${IST_MONTH_SQL} AS ym, COUNT(*) AS c FROM leads GROUP BY ym`);
  return NextResponse.json({ months: fillMonths(rows) });
}
