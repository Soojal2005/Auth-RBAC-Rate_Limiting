import fastify from "fastify";
import { env } from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { userRoutes } from "./modules/users/v1/users.routes";
import { v1Routes } from "./api/v1";
import { AppError } from "./utils/error";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export async function buildapp(){
const app =  fastify({
        logger: { level:env.NODE_ENV === "production" ? "info" : "debug"},
    });

app.get("/health",()=>{
    return {status:"ok"};
});

app.setErrorHandler((error,request,reply)=>{
    if(error instanceof AppError){
        return reply.status(error.statusCode).send({
            message:error.message,
            code:error.code,
        });
    }
    request.log.error(error);
    return reply.status(500).send({
        error:"Internal Server Error",
        message:"INTERNAL_SERVER_ERROR",
    });
});

app.register(swagger, {
  openapi: {
    info: {
      title: "Auth RBAC Backend",
      description: "JWT auth, RBAC and rate-limited APIs",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});


await app.register(swaggerUI,{routePrefix:"/docs",})

app.register(v1Routes,{prefix:"/api/v1"});
return app;
}
