// src/utils/roleConfig.ts
/**
 * ROLE_MAP is an ordered array of { path, allowedRoles }.
 * middleware.ts will iterate this list and pick the first matching path
 * (exact match or .startsWith).
 *
 * Add or change entries here to control which roles can access which path prefixes.
 *
 * You asked for three roles: "owner", "admin", "user".
 *
 * Default behavior in middleware:
 * - If a request path matches an entry here -> role must be one of allowedRoles.
 * - If no entries match -> any authenticated user can access.
 *
 * Examples included below:
 *
 * - Owner-only area: /owner...
 * - Admin area (admin OR owner): /admin...
 * - A management area (admin only): /management...
 *
 * Edit this file to suit your app route layout.
 */

export const ROLE_MAP = [
  // Owner-only pages
  { path: "/owner", allowedRoles: ["owner"] },

  // Admin pages (allow owner as well — owners can act as admin)
  { path: "/admin", allowedRoles: ["admin", "owner"] },

  // Any other manager-style page if you had more (example)
  { path: "/management", allowedRoles: ["admin"] },

  // Add more protected prefixes as needed:
  // { path: "/billing", allowedRoles: ["admin", "owner"] },
];

export const PUBLIC_PATHS = [
  "/authentication/login",
  "/authentication/register",
  "/",
  "/api/auth/login",
  "/api/auth/register",
  "/favicon.ico",
  "/_next",
];
