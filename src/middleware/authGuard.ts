import { Permission } from "../config/permission";
import { FastifyRequest,FastifyReply } from "fastify";
import { authMiddleware } from "./auth_middleware";
import { RATE_LIMIT } from "../modules/rate-limits/rate-limit.config";
import { rateLimitMiddleware } from "./rateLimiting.middleware";
import { requirePermission } from "./rbac.middleware";

type AuthGuardOptions = {
    permission?:Permission,
    rateLimit?: boolean,
}

export function authGuard(options:AuthGuardOptions){
    return async function (
        request: FastifyRequest,
        reply: FastifyReply,
    ){
        await authMiddleware(request,reply);

        if(options.rateLimit){
            await rateLimitMiddleware(request,reply);
        }
    
        if(options.permission){
            await requirePermission(options.permission);
        }
    }
}