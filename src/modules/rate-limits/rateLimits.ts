import { FastifyRequest, FastifyReply } from "fastify";
import { redis } from "../../config/redis";
import { RATE_LIMIT } from "./config";
import { Role } from "../rbac/permission";
import { PLAN_RATE_LIMITS } from "./config";
import { resolvePlan } from "./config";
import { RateLimitError } from "../../utils/error";
import { rateLimitLua } from "./lua";

export async function rateLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  if (!redis) {
    return;
  }

  const { userId } = request.user;
  if (!userId) {
    return;
  }
  const role = request.user.role as Role;
  const plan = resolvePlan(request.user);
  const { limit, windowSeconds } = PLAN_RATE_LIMITS[plan];
  const route = request.routeOptions.url;
  const key = `rate:${userId}:${route}`;
  const config = PLAN_RATE_LIMITS[plan] ?? RATE_LIMIT[role];
  const [count, ttl] = (await redis.eval(
    rateLimitLua,
    1,
    key,
    config.windowSeconds,
  )) as [number, number];
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  // const ttl = await redis.ttl(key);
  const remaining = Math.max(config.limit - count, 0);
  reply.header("X-RateLimit-Limit", config.limit);
  reply.header("X-RateLimit-Remaining", remaining);
  reply.header("X-RateLimit-Reset", Math.floor(Date.now() / 1000) + ttl);
  if (count > config.limit) {
    throw new RateLimitError(
      `Rate limit exceeded. Max ${limit} requests in ${windowSeconds} seconds.`,
    );
  }
}
