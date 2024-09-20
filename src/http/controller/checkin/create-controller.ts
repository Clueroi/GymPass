import { makeCheckInUseCase } from "@/use-cases/factory/make-check-ins-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factory/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function CreateCheckIn(request: FastifyRequest, reply: FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId:z.string().uuid()
    })

    const createCheckInSchemaBody = z.object({
        latitude:z.number(),
        longitude:z.number()
    })

    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const {latitude, longitude } = createCheckInSchemaBody.parse(request.body)

    const CheckInUSeCase = makeCheckInUseCase()

    await CheckInUSeCase.execute({
        userId:request.user.sub,
        gymId,
        userLatitude:latitude,
        userLongitude:longitude
    })

    return reply.status(201).send()
}