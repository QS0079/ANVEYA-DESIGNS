import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const sets = [];
  const vals = [];
  if (typeof body.status === "string") {
    if (!LEAD_STATUSES.some((s) => s.value === body.status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    sets.push("status = ?"); vals.push(body.status);
  }
  if (typeof body.notes === "string") { sets.push("notes = ?"); vals.push(body.notes.slice(0, 5000)); }
  if (!sets.length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  await query(`UPDATE leads SET ${sets.join(", ")} WHERE id = ?`, [...vals, Number(id)]);
  const [row] = await query("SELECT * FROM leads WHERE id = ?", [Number(id)]);
  return NextResponse.json({ row });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  await query("DELETE FROM leads WHERE id = ?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
