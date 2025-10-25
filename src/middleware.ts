// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLE_MAP, PUBLIC_PATHS } from "./utils/roleConfig";

/**
 * Middleware for authentication + RBAC (Edge-friendly)
 *
 * - Verifies JWT from cookie named "token" using process.env.JWT_SECRET (HS256).
 * - If missing or invalid -> redirect to /authentication/login
 * - If the requested path matches a protected entry in ROLE_MAP, the token's `role`
 *   must be included in the allowed roles, otherwise redirect to /unauthorized
 *
 * Notes:
 * - This file must remain Edge-safe: do NOT import Node-only modules here.
 * - Use `jose` for JWT verification (Web Crypto-compatible).
 */

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Read token from cookie "token"
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // Not logged in -> redirect to login
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  try {
    // Ensure JWT_SECRET is present
    const secretRaw = process.env.JWT_SECRET ?? "";
    if (!secretRaw) {
      console.error("Missing JWT_SECRET in middleware environment");
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }

    // jose expects a CryptoKey or Uint8Array for HMAC shared secret
    const secret = new TextEncoder().encode(secretRaw);

    // Verify the token (throws if invalid/expired)
    const { payload } = await jwtVerify(token, secret);

    // Expect token payload to have a `role` string (e.g., "user"|"admin"|"owner")
    const role = typeof payload.role === "string" ? (payload.role as string) : undefined;

    // If route is included in ROLE_MAP, enforce allowed roles
    for (const entry of ROLE_MAP) {
      const entryPath = entry.path;
      if (pathname === entryPath || pathname.startsWith(entryPath)) {
        // route is protected: check role
        if (!role || !entry.allowedRoles.includes(role)) {
          // Not authorized for this route
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
        // allowed — proceed
        return NextResponse.next();
      }
    }

    // No specific RBAC rule matched the path. The request is authenticated: allow.
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed in middleware:", err);
    // Invalid/expired token -> redirect to login
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  // Avoid applying middleware to static assets / Next internals automatically
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
