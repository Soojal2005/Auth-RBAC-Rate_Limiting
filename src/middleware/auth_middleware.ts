import { FastifyRequest,FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
){
 const authHeader = request.headers.authorization;
 if(!authHeader){
    return reply.status(401).send({
        message:"Authorization header is Missing"
    });
 };
   const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return reply.status(401).send({
      message: "Invalid authorization format",
    });
  }
 try {
    const payload = verifyAccessToken(token);
    request.user = payload;
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid or expired token",
    });
  }
}