import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/veify-jwt";

export function gymRoutes(app:FastifyInstance){
    app.addHook('onRequest', verifyJWT)
}