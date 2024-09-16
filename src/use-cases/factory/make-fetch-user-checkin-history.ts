import { FetchUserCheckInHistoryUseCase } from "../fetch-user-checkin-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeFetchserCheckInsHistoryUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

    return useCase
}