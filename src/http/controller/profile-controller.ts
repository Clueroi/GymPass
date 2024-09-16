import {FastifyRequest, FastifyReply} from 'fastify'

// post('/users', async...) 
    export async function profile(request: FastifyRequest, reply:FastifyReply) {
  

    return reply.status(200).send('User loged')
}