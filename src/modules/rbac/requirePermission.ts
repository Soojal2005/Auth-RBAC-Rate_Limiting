import { ROLE_PERMISSIONS } from "./permission";
import { Permission } from "./permission";
import { AppError } from "../../utils/error";

export function requirePermission(
    permission : Permission
){
    return async function (request:any,reply:any){
        const user = request.user;
        if(!user){
            throw new AppError("Unauthorized",401);
        }
        const permissions = ROLE_PERMISSIONS[user.role];
        if(!permissions.includes(permission)){
            throw new AppError("Forbidden: insufficient permission",403);
        }
    }
}