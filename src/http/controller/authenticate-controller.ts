import {FastifyRequest, FastifyReply} from 'fastify'
import { z } from "zod"
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factory/make-authenticate-use-case'

// post('/users', async...) 
    export async function authenticate(request: FastifyRequest, reply:FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password} = authenticateBodySchema.parse(request.body)

    try{    

        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({
            email,
            password
        })

    } catch(err){
        if(err instanceof InvalidCredentialsError){
            reply.status(409).send({message: err.message})
        }

        return reply.status(500).send() //TODO: Fix me
    }

    return reply.status(200).send('User loged')
}