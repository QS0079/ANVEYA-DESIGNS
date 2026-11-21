import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  const { ids } = await req.json().catch(() => ({}));
  if (!Array.isArray(ids)) return NextResponse.json({ error: "ids required" }, { status: 400 });
  for (let i = 0; i < ids.length; i++) {
    await query("UPDATE faqs SET sort_order = ? WHERE id = ?", [i + 1, Number(ids[i])]);
  }
  return NextResponse.json({ ok: true });
}
