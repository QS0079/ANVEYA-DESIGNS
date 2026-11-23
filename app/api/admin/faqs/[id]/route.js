import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));
  const sets = [];
  const vals = [];
  if (typeof b.question === "string") {
    if (!b.question.trim()) return NextResponse.json({ error: "Question is required." }, { status: 400 });
    sets.push("question = ?"); vals.push(b.question.trim().slice(0, 500));
  }
  if (typeof b.answer === "string") {
    if (!b.answer.trim()) return NextResponse.json({ error: "Answer is required." }, { status: 400 });
    sets.push("answer = ?"); vals.push(b.answer.trim());
  }
  if (typeof b.is_active === "boolean") { sets.push("is_active = ?"); vals.push(b.is_active ? 1 : 0); }
  if (!sets.length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  await query(`UPDATE faqs SET ${sets.join(", ")} WHERE id = ?`, [...vals, Number(id)]);
  const [row] = await query("SELECT * FROM faqs WHERE id = ?", [Number(id)]);
  return NextResponse.json({ row });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const res = await query("DELETE FROM faqs WHERE id = ?", [Number(id)]);
  if (!res.affectedRows) return NextResponse.json({ error: "FAQ not found — it may already be deleted." }, { status: 404 });
  return NextResponse.json({ ok: true, deleted: res.affectedRows });
}
