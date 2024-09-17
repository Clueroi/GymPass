import {FastifyRequest, FastifyReply} from 'fastify'
import { z } from "zod"
import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factory/make-register-use-case'

// post('/users', async...) 
    export async function register(request: FastifyRequest, reply:FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(), 
        password: z.string().min(6),
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try{    
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password
        })
    } catch(err){
        if(err instanceof UserAlreadyExists){
            reply.status(409).send({message: err.message})
        }

        return reply.status(500).send() //TODO: Fix me
    }

    return reply.status(201).send('User created')
}