import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt";
import { usersRepository } from "../modules/users/user.repository";
import { users } from "../modules/auth/auth.store";
import { logger } from "../config/logger";
export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({
      message: "Authorization header is Missing",
    });
  }
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return reply.status(401).send({
      message: "Invalid authorization format",
    });
  }
  try {
    const payload = verifyAccessToken(token);
    const user = await usersRepository.FindById(payload.userId);
    if (!user) {
      return reply.status(401).send({
        message: "User associated with token not found",
      });
    }
    request.user = payload;
    logger.info(payload);
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid or expired token",
    });
  }
}
