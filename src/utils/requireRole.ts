// src/utils/requireRole.ts
import jwt from "jsonwebtoken";

export function verifyTokenFromHeaderOrCookie(token?: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("Missing JWT_SECRET");

  if (!token) throw new Error("Missing token");

  const payload = jwt.verify(token, jwtSecret) as any;
  return payload;
}

/**
 * Require that the payload role is one of allowedRoles.
 * Throws an Error if not authorized.
 */
export function requireRole(payload: any, allowedRoles: string[]) {
  const role = payload?.role;
  if (!role || !allowedRoles.includes(role)) {
    const err: any = new Error("Unauthorized");
    err.status = 403;
    throw err;
  }
}
