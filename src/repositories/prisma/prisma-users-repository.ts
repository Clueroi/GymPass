import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { usersRepository } from "../users-repository";

export class PrismaUsersRepository implements usersRepository{

    async findById(id: string) {
        const userId = await prisma.user.findUnique({
            where:{
                id
            }
        })

        return userId
    }
    async findByEmail(email: string){
        const userEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        return userEmail
    }
    async create(data:Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })
        return user
    }
}