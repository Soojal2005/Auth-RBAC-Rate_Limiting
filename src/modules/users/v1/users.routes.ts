import { usersRepository } from "./user.repository";
import { FastifyInstance } from "fastify";
import { requirePermission } from "../../../middleware/rbac.middleware";
import { authGuard } from "../../../middleware/authGuard";
import { PERMISSIONS } from "../../rbac/permission";
import { getUserController } from "./users.controller";
export async function userRoutes(app: FastifyInstance) {
  app.get("/",
    { preHandler: authGuard ({
      permission: PERMISSIONS.USER_WRITE,
      rateLimit: true,
    }),
   
    schema: {
      description: "Get all users",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: "object",
          properties: {
            users: {
              type: "array",
              items: { type: "object" },
            },
          },
        },
      },
    },
  },

    getUserController
  );
}