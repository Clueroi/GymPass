import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository"
import { FetchNearbyGymsUseCase } from "../fetch-neraby-gyms"

export function makefFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}