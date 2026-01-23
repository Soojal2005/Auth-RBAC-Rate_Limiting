import "fastify";
import { JwtPayLoad } from "../utils/jwt";

declare module "fastify"{
    interface FastifyRequest{
        user:JwtPayLoad
    }
}