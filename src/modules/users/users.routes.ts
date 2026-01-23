import { usersRepository } from "./user.repository";
import { FastifyInstance } from "fastify";
import { requirePermission } from "../../middleware/rbac.middleware";
export async function userRoutes(app: FastifyInstance) {
  app.get("",
    { preHandler: [requirePermission("user:read")] },
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