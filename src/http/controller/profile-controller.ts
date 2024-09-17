import { FastifyRequest, FastifyReply } from 'fastify'

// post('/users', async...) 
export async function profile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify() 

    return reply.status(200).send('User Page')
}