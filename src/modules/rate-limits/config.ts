import { Role } from "../rbac/permission"; 

export const RATE_LIMIT:Record<Role,{
    limit:number;
    windowSeconds:number
}> = {
    user : {
        limit : 100,
        windowSeconds : 60
    },
    admin :{
        limit : 1000,
        windowSeconds : 60
    }
}
export const PLANS = {
    FREE : "FREE",
    PRO : "PRO",
    ADMIN : "ADMIN",
}as const;

export type Plan = (typeof PLANS)[keyof typeof PLANS];

export const PLAN_RATE_LIMITS : Record<Plan,{
    limit : number ; windowSeconds : number
}> = {
    FREE:{
        limit : 100,
        windowSeconds : 60
    },
    PRO :{
        limit:1000,
        windowSeconds : 60,
    },
    ADMIN: {
    limit: 10000,
    windowSeconds: 60,
  },
} as const;
export type PlanRateLimitConfig = keyof typeof PLAN_RATE_LIMITS;

export function resolvePlan(user: { plan?: Plan }): Plan {
  return user.plan ?? "FREE";
}