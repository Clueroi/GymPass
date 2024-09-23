import fastify from 'fastify'
import { userRoutes } from './http/controller/users/routes'
import  fastifyCookie  from '@fastify/cookie'
import { gymRoutes } from './http/controller/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { checkInRoutes } from './http/controller/checkin/routes'

export const app = fastify()

app.register(fastifyJwt, {
    secret:env.JWT_SECRET,
    cookie:{
        cookieName:'refreshToken',
        signed:false
    },
    sign:{
        expiresIn:'10m'
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, request, reply)=>{
    if(error instanceof ZodError){
        return reply
        .status(400)
        .send({message:'Validation Error', issues: error.format()})
    }

    if(env.NODE_ENV !== 'production'){
        console.log(error)
    }

    return reply.status(500).send({message:'Internal Server Error'})
})