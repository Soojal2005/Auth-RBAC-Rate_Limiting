import { usersRepository } from "./user.repository";
export async function getUserById(
    userId:string
){
    return usersRepository.FindById(userId);
}