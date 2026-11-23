import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Keep-alive: the middleware renews the admin session on this request. */
export async function GET() {
  return NextResponse.json({ ok: true });
}
