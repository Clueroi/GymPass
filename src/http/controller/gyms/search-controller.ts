import { makeSearchGymUseCase } from "@/use-cases/factory/make-search-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function SearchGym(request:FastifyRequest,reply:FastifyReply){

    const searchGym = z.object({
        q:z.string(),
        page:z.coerce.number().min(1).default(1)
    })

    const {q, page} = searchGym.parse(request.query)

    const queryGymUseCase = makeSearchGymUseCase()

    const {gyms} = await queryGymUseCase.execute({
        query:q,
        page
    })

    return reply.status(200).send({
        gyms
    })
}