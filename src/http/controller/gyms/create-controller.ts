import { makeCreateGymUseCase } from "@/use-cases/factory/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function CreateGym(request: FastifyRequest, reply: FastifyReply) {
    const createSchemaBody = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { title, description, phone, latitude, longitude } = createSchemaBody.parse(request.body)

    const CreateGymUSeCase = makeCreateGymUseCase()

    await CreateGymUSeCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude
    })

    return reply.status(201).send()
}