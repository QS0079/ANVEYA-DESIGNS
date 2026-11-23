import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "anveya_admin";
// Admin is signed out after 10 minutes without activity. Every admin request (and the
// keep-alive ping sent while the admin is active) renews the session for another 10 minutes.
export const IDLE_SECONDS = 10 * 60;
const MAX_AGE = IDLE_SECONDS;

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "anveya-dev-secret-change-me");
}

export async function createSession(user) {
  return new SignJWT({ sub: String(user.sub ?? user.id), email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
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

/** For route handlers: returns the session payload or null. */
export async function getSessionFromRequest(req) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}
