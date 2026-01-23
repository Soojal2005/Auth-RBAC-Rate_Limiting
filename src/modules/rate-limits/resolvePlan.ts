import { Plan } from "./rate-limit.config";

export function resolvePlan (user:{
    role : "USER" | "ADMIN";
}):Plan {
    if(user.role == "ADMIN") return "ADMIN";
    return "FREE";
}