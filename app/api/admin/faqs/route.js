import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await query("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC");
  return NextResponse.json({ rows });
}

export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const question = String(b.question || "").trim();
  const answer = String(b.answer || "").trim();
  if (!question || !answer) return NextResponse.json({ error: "Question and answer are required." }, { status: 400 });
  const [{ m }] = await query("SELECT COALESCE(MAX(sort_order), 0) AS m FROM faqs");
  const r = await query("INSERT INTO faqs (question, answer, sort_order, is_active) VALUES (?, ?, ?, ?)", [
    question.slice(0, 500), answer, Number(m) + 1, b.is_active === false ? 0 : 1,
  ]);
  const [row] = await query("SELECT * FROM faqs WHERE id = ?", [r.insertId]);
  return NextResponse.json({ row });
}
