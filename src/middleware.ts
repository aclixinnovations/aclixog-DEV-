// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLE_MAP, PUBLIC_PATHS } from "./utils/roleConfig";

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
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET ?? "";
    if (!jwtSecret) {
      console.error("JWT_SECRET not configured for middleware");
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }

    const secret = new TextEncoder().encode(jwtSecret);

    const { payload } = await jwtVerify(token, secret);
    const role = typeof payload.role === "string" ? payload.role : undefined;

    // Enforce ROLE_MAP rules
    for (const entry of ROLE_MAP) {
      if (pathname === entry.path || pathname.startsWith(entry.path)) {
        if (!role || !entry.allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
        return NextResponse.next();
      }
    }

    // No specific rule matched: authenticated users allowed
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed in middleware:", err);
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
