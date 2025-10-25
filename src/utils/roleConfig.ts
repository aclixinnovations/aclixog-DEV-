// src/utils/roleConfig.ts
/**
 * ROLE_MAP determines which roles can access which path prefixes.
 *
 * Order matters only for readability; code does a startsWith check.
 *
 * Roles in your app: "owner", "admin", "user"
 */
export const ROLE_MAP = [
  // Owner-only area
  { path: "/owner", allowedRoles: ["owner", "admin"] }, // owner primary, admin allowed as fallback

  // Admin area - admin + owner
  { path: "/admin", allowedRoles: ["admin", "owner"] },

  // Management example - admin only
  { path: "/management", allowedRoles: ["admin"] },
];

/**
 * PUBLIC_PATHS - middleware will allow these without authentication.
 * Keep login/register and API login/register public.
 */
export const PUBLIC_PATHS = [
  "/authentication/login",
  "/authentication/register",
  "/",
  "/api/auth/login",
  "/api/auth/register",
  "/favicon.ico",
  "/_next",
];
