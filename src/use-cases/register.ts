import bcrypt from 'bcryptjs'
import { usersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

const hash = bcrypt.hash


interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase{

    constructor(private usersRepository: usersRepository){}

    async execute({name, email, password}:RegisterUseCaseRequest):Promise<RegisterUseCaseResponse>{
    
        const password_hash = await hash(password, 6)

        const sameUserEmail = await this.usersRepository.findByEmail(email)
    
        if(sameUserEmail){
            throw new UserAlreadyExists()
        }
    
        // const prismaUsersRepository = new PrismaUsersRepository()
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
        
        return {
            user,
        }
    }
}
