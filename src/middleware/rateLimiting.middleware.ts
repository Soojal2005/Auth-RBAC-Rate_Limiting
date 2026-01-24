import { FastifyRequest, FastifyReply } from "fastify";
import { redis } from "../config/redis";
import { RATE_LIMIT } from "../modules/rate-limits/rate-limit.config";
import { Role } from "../modules/rbac/rbac.config";
import { PLAN_RATE_LIMITS } from "../modules/rate-limits/rate-limit.config";
import { resolvePlan } from "../modules/rate-limits/resolvePlan";
export async function rateLimitMiddleware(
    request:FastifyRequest,
    reply:FastifyReply
){
    const {userId,plan} = request.user;
    if(!userId) {return;}
    const role = request.user.role as Role;
    const {limit,windowSeconds} = PLAN_RATE_LIMITS[plan];
    const route = request.routeOptions.url;
    const key = `rate:${userId}:${route}`;
    const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key,windowSeconds);
  }
  if (count > limit) {
    return reply.status(429).send({
      message: "Too many requests. Please try again later.",
    });
}
}
