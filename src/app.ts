import fastify from 'fastify'
import { userRoutes } from './http/controller/users/routes'
import { gymRoutes } from './http/controller/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(userRoutes)
app.register(fastifyJwt, {
    secret:env.JWT_SECRET,
})



app.setErrorHandler((error, request, reply)=>{
    if(error instanceof ZodError){
        return reply
        .status(400)
        .send({message:'Validation Error', issues: error.format()})
    }

    if(env.NODE_ENV !== 'production'){
        console.log(error)
    } else {
        //TODO: Here we should log to an external tool, like, DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({message:'Internal Server Error'})
})