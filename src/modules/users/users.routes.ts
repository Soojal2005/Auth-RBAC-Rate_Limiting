import { usersRepository } from "./user.repository";
import { FastifyInstance } from "fastify";
import { requirePermission } from "../../middleware/rbac.middleware";
import { authGuard } from "../../middleware/authGuard";
import { PERMISSIONS } from "../rbac/rbac.config";
export async function userRoutes(app: FastifyInstance) {
  app.get("",
    { preHandler: authGuard({
      permission: PERMISSIONS.USER_WRITE,
      rateLimit: true,
    }) },
    async(request,reply) =>{
       const userId = request.user.userId;

      const user = await usersRepository.FindById(userId);

      if (!user) {
        return reply.status(404).send({
          message: "User not found",
        });
      }
        return reply.send({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });
    }
  )
}