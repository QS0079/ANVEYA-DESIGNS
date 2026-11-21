import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { createSession, cookieOptions, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { email = "", password = "" } = await req.json().catch(() => ({}));
  const e = String(email).trim().toLowerCase();
  if (!e || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

  let rows;
  try {
    rows = await query("SELECT id, name, email, password_hash FROM admin_users WHERE LOWER(email) = ? LIMIT 1", [e]);
  } catch (err) {
    console.error("[login] DB error:", err.message);
    return NextResponse.json({ error: "Database connection failed. Check your .env.local DB settings." }, { status: 500 });
  }
  const user = rows[0];
  const ok = user && (await bcrypt.compare(String(password), user.password_hash));
  if (!ok) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  const token = await createSession(user);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
  return res;
}
