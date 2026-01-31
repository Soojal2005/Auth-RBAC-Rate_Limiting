import { FastifyInstance } from "fastify";

import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/users/v1/users.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

export async function v1Routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(userRoutes, { prefix: "/users" });
  app.register(adminRoutes, { prefix: "/admin" });
}
