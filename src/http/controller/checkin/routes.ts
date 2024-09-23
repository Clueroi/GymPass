import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { CreateCheckIn } from "./create-controller";
import { validate } from "./validate-controller";
import { history } from "./history-controller";
import { metrics } from "./metrics-controller";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";


export async function checkInRoutes(app:FastifyInstance){

    app.addHook('onRequest',verifyJWT)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-ins', CreateCheckIn)

    app.patch('/check-ins/:checkInId/validate', {onRequest:[verifyUserRole('ADMIN')]} ,validate)
}