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
    const user = request.user;
    if(!user) {return;}
    const role = user.role as Role;
    const config = RATE_LIMIT[role];
    const plan = resolvePlan(request.user);
    const rule = PLAN_RATE_LIMITS[plan];
    const route = request.routeOptions.url;
    const key = `rate:${user.userId}:${route}`;
    const count = await redis.incr(key);
    
  if (count === 1) {
    await redis.expire(key, config.windowSeconds);
  }
  if (count > config.limit) {
    return reply.status(429).send({
      message: "Too many requests. Please try again later.",
    });
}
}
