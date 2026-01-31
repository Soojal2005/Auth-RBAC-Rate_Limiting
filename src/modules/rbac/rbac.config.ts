// export const ROLES = {
//     ADMIN:"admin",
//     USER:"user"
// } as const;

// export type Role = typeof ROLES[keyof typeof ROLES];

// export const PERMISSIONS = {
//     USER_READ : "user:read",
//     USER_WRITE:"user:write",
//     ADMIN_ACCESS:"admin:access"
// }as const;

// export const ROLE_PERMISSIONS:Record<string,string[]> = {
//     [ROLES.ADMIN]:[PERMISSIONS.USER_READ,
//         PERMISSIONS.USER_WRITE,
//         PERMISSIONS.ADMIN_ACCESS
//     ],
//     [ROLES.USER]:[PERMISSIONS.USER_READ]
// }
