import fastify from "fastify";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { userRoutes } from "./modules/users/users.routes";
import { v1Routes } from "./api/v1";
export function buildapp(){
const app =  fastify({
        logger: { level:env.NODE_ENV === "production" ? "info" : "debug"},
    });

app.get("/health",()=>{
    return {status:"ok"};
});

app.register(v1Routes,{prefix:"/api/v1"});
return app;
}
