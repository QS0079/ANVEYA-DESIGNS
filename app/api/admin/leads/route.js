import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const sp = req.nextUrl.searchParams;
  const q = (sp.get("q") || "").trim();
  const status = sp.get("status") || "";
  const type = sp.get("type") || "";
  const page = Math.max(1, parseInt(sp.get("page") || "1", 10));
  const per = Math.min(100, Math.max(5, parseInt(sp.get("per") || "20", 10)));

  const where = [];
  const params = [];
  if (q) {
    where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR location LIKE ? OR message LIKE ? OR timeline LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like, like, like, like);
  }
  if (status) { where.push("status = ?"); params.push(status); }
  if (type) { where.push("property_type = ?"); params.push(type); }
  const w = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM leads ${w}`, params);
  const rows = await query(
    `SELECT * FROM leads ${w} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...params, per, (page - 1) * per]
  );
  return NextResponse.json({ rows, total: Number(total), page, per });
}
