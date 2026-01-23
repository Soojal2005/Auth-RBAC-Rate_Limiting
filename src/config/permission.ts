
export const PERMISSIONS = {
  USER_READ: "user:read",
  USER_WRITE: "user:write",
  ADMIN_ACCESS: "admin:access",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
