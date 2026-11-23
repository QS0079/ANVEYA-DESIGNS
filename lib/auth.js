import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "anveya_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours — normal sign-in
const REMEMBER_AGE = 60 * 60 * 24 * 30; // 30 days — "Remember me"

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "anveya-dev-secret-change-me");
}

export async function createSession(user, { remember = false } = {}) {
  return new SignJWT({ sub: String(user.id), email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${remember ? REMEMBER_AGE : MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  // Set COOKIE_SECURE=true in .env when the site is served over HTTPS
  secure: process.env.COOKIE_SECURE === "true",
  path: "/",
  maxAge: MAX_AGE,
};

/**
 * Cookie settings for a new sign-in.
 * remember = true  → stays signed in for 30 days, even after the browser is closed.
 * remember = false → signed out when the browser is closed (and after 12 hours at most).
 */
export function sessionCookieOptions(remember) {
  const { maxAge, ...rest } = cookieOptions;
  return remember ? { ...rest, maxAge: REMEMBER_AGE } : rest;
}

/** For route handlers: returns the session payload or null. */
export async function getSessionFromRequest(req) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}
