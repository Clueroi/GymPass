import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository"
import { CheckInUseCase } from "../check-ins"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymRepository()
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}