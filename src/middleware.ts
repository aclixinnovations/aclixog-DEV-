import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/app", "/dashboard", "/performance-analytics"];
  const adminRoutes = ["/admin"];

  if (!token && protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  try {
    if (token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      // Check admin access
      if (adminRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/dashboard/:path*", "/admin/:path*"],
};
