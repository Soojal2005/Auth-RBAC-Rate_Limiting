import { FastifyRequest,FastifyReply } from "fastify";
import { getUserById } from "./users.service";
import  { NotFoundError } from "../../../utils/error";
export async function getUserController(
    request:FastifyRequest,
    reply:FastifyReply
){
    const userId = request.user.userId;

    const user = await getUserById(userId);

    if (!user) {
     throw new NotFoundError("User not found");
    }
      return reply.send({
          id: user.id,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
      });
}   