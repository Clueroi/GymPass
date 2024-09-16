import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository"
import { SearchGymUseCase } from "../search-gym"
import { FetchNearbyGymsUseCase } from "../fetch-neraby-gyms"

export function makefFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}