// import { FastifyRequest,FastifyReply } from "fastify";
// import { ROLE_PERMISSIONS } from "../modules/rbac/permission";
// import { Permission } from "../modules/rbac/permission";

// export async function requirePermission(
//   request: FastifyRequest,
//   reply: FastifyReply,
//   permission: Permission
// ){
//     const user  = request.user;
//     const allowedPermissions = ROLE_PERMISSIONS[user.role];
//     if(!allowedPermissions.includes(permission)){
//       return reply.status(403).send({
//         message: "Access denied. No permissions assigned to your role.",
//       });
//     }
//   }