import { usersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs  from "bcryptjs";
import { User } from "@prisma/client";

const {compare} = bcryptjs

interface AuthenticateUseCaseRequest{
    email:string
    password:string
}

interface AuthenticateUseCaseResponse{
    user:User
}

export class AuthenticateUseCase{
    constructor(
        private usersRepository: usersRepository
    ){}

    async execute({email, password}:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }  
}