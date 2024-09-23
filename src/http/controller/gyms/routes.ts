import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { SearchGym } from "./search-controller";
import { nearbyGyms } from "./nearby-controller";
import { CreateGym } from "./create-controller";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";

export async function gymRoutes(app:FastifyInstance){
    
    app.addHook('onRequest', verifyJWT)
    
    app.post('/gyms', {onRequest:[verifyUserRole('ADMIN')]} ,CreateGym)

    app.get('/gyms/search', SearchGym)
    app.get('/gyms/nearby', nearbyGyms)

}