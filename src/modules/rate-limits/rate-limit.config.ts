import { Role } from "../rbac/rbac.config" 

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
    ADMIN : {
        limit : Number.POSITIVE_INFINITY,
        windowSeconds: 60
    }
}