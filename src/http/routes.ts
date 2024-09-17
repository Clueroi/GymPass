import { FastifyInstance } from "fastify";
import { register } from "./controller/register-controller";
import { authenticate } from "./controller/authenticate-controller";
import { profile } from "./controller/profile-controller";
import { verifyJWT } from "./middlewares/veify-jwt";

export async function appRoutes(app:FastifyInstance){

    app.post('/users', register)
    app.post('/sessions', authenticate)

    /* Authenticated */
    app.get('/me', {onRequest:[verifyJWT]},profile)
}
