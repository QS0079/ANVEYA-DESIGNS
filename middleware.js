import { NextResponse } from "next/server";
import { verifySession, createSession, cookieOptions, SESSION_COOKIE } from "@/lib/auth";

// Each admin request pushes the 10-minute idle timer forward.
async function renew(res, session) {
  res.cookies.set(SESSION_COOKIE, await createSession(session), cookieOptions);
  return res;
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);

  if (pathname.startsWith("/api/admin")) {
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return renew(NextResponse.next(), session);
  }
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      if (req.cookies.get(SESSION_COOKIE)?.value) url.searchParams.set("reason", "idle");
      return NextResponse.redirect(url);
    }
    return renew(NextResponse.next(), session);
  }
  if (pathname === "/login" && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/login"] };
