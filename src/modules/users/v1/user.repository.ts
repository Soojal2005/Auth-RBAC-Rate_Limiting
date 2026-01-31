import { Role } from "@prisma/client";
import { prisma } from "../../../config/prisma";
export interface CreateUserInput{
    email:string,
    passwordHash:string,
    role?:Role
}
export const usersRepository = {
    async create(input:CreateUserInput){
        return prisma.user.create({
            data:{
                email:input.email,
                passwordHash:input.passwordHash,
                role:input.role ?? "USER"
            },
        });
    },
    async findByEmail(email:string){
        return prisma.user.findUnique({
            where : {email},
        });
    },
    async FindById(id:string){
        return prisma.user.findUnique({
            where : {id},
        })
    }
}

