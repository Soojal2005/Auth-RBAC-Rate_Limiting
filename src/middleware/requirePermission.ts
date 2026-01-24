import { ROLE_PERMISSIONS } from "../modules/rbac/rbac.config";
import { Permission } from "../config/permission";

export function requirePermission(
    permission : Permission
){
    return async function (request:any,reply:any){
        const user = request.user;
        if(!user){
            return reply.code(401).send({message:"Unauthicated"});
        }
        const permissions = ROLE_PERMISSIONS[user.role];
        if(!permissions.includes(permission)){
            return reply.code(403).send(
                {messahe:"Forbidden: insufficiednt Permission"}
            )
        }
    }
}