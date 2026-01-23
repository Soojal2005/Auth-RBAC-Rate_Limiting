import { FastifyRequest, FastifyReply } from "fastify";
import { ROLE_PERMISSIONS } from "../modules/rbac/rbac.config";

export function requirePermission(permission: string) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user;

    if (!user){
      return reply.status(401).send({
        message: "Unauthorized Access",
      });
    };

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    if (!permissions.includes(permission)) {
      return reply.status(403).send({
        message: "Forbidden: insufficient permissions",
      });
    }
   
  };
}
