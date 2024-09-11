import { Prisma, User } from "@prisma/client";

export interface usersRepository{
    findByEmail(email:string):Promise<User | null>
    create(data:Prisma.UserCreateInput): Promise<User>
    findById(id:string):Promise<User | null>
}