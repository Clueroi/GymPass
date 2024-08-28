import {hash} from 'bcryptjs'
import { prisma } from '@/lib/prisma'


interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}

export class RegisterUseCase{

    constructor(private usersRepository: any){}

    async execute({name, email, password}:RegisterUseCaseRequest){
    
        const password_hash = await hash(password, 6)
    
        const sameUserEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
    
        if(sameUserEmail){
            throw new Error('User already exists')
        }
    
        // const prismaUsersRepository = new PrismaUsersRepository()
    
        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
        
    }
}
