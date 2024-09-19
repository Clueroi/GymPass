import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/veify-jwt";
import { SearchGym } from "./search-controller";
import { nearbyGyms } from "./nearby-controller";
import { CreateGym } from "./create-controller";

export function gymRoutes(app:FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', SearchGym)
    app.get('/gyms/nearby', nearbyGyms)
    app.post('/gyms', CreateGym)

}