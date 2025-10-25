// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Public paths that don't require auth
 */
const PUBLIC_PATHS = ["/authentication/login", "/authentication/register", "/"];

/**
 * Middleware to check JWT present in cookie and (light) RBAC checks.
 * Uses `jose` so it works in Next.js Edge runtime / Vercel.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Read token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // No token — redirect to login
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  try {
    // jose expects a Key like a Uint8Array for a shared secret HMAC (HS256)
    // We convert the JWT_SECRET env var into a Uint8Array with TextEncoder.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

    // verify token (throws on invalid)
    const { payload } = await jwtVerify(token, secret);

    // payload is an object — extract role (it should match what you sign in login route)
    const role = payload.role as string | undefined;

    // Example RBAC route: only admins allowed to /admin
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // You can add more RBAC checks here. For example:
    // if (pathname.startsWith("/manager") && role !== "manager" && role !== "admin") { ... }

    // allow the request
    return NextResponse.next();
  } catch (err) {
    // Invalid or expired token -> redirect to login (or you can clear cookie first)
    console.error("JWT verify error in middleware:", err);
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  // Mirror your previous matcher. Keeps static assets etc excluded.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
