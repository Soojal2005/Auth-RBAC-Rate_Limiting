import jwt  from "jsonwebtoken";
import { env } from "../config/env";
import { Role } from "@prisma/client";
export type JwtPayLoad = {
    userId: string,
    email:string,
    role: Role,
};

export function signAccessToken(payload:JwtPayLoad):string{
    return  jwt.sign(payload,env.JWT_SECRET,{
        expiresIn:"15min"
    })
};

export function verifyAccessToken(token: string): JwtPayLoad {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayLoad;
};