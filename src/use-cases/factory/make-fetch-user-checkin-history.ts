import { FetchUserCheckInHistoryUseCase } from "../fetch-user-checkin-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUserCheckInsHistoryUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

    return useCase
}