import { User, Prisma } from "@prisma/client";
import { usersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class inMemoryUsersRepository implements usersRepository{
    public items: User[] =[]
    
    async findById(id: string) {
        const user = this.items.find(item => item.id === id)

        if(!user){
            return null
        }

        return user
    }
    

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = {
            id:randomUUID(),
            email:data.email,
            name:data.name,
            password_hash:data.password_hash,
            created_at:new Date(),
        }

        this.items.push(user)

        return user
    }
}