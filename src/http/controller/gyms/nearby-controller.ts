import { makeFetchNearbyGymsUseCase } from "@/use-cases/factory/make-fetch-nearby-gyms-use-case";
import {FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function nearbyGyms(request:FastifyRequest, reply: FastifyReply){
    
    const nearbyGymsSchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const {latitude, longitude} = nearbyGymsSchema.parse(request.query)

    const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const gyms = await nearbyGymsUseCase.execute({
        userLatitude:latitude,
        userLongitude:longitude
    })

}