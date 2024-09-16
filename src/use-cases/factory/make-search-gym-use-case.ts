import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository"
import { SearchGymUseCase } from "../search-gym"

export function makeSearchGymUseCase(){
    const gymsRepository = new PrismaGymRepository()
    const useCase = new SearchGymUseCase(gymsRepository)

    return useCase
}