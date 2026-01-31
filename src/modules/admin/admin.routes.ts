import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middleware/auth_middleware";
import { requirePermission } from "../../middleware/rbac.middleware";
import { PERMISSIONS } from "../rbac/permission";
import { Permission } from "../rbac/permission";

export async function adminRoutes(app:FastifyInstance){
    app.get("/dashboard",
        {preHandler:[
            authMiddleware,
            requirePermission(PERMISSIONS.ADMIN_ACCESS)
        ]},async()=>{
            return{
                message:`Welcome`,
            }
        }
    );
}