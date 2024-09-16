import { ValidateUseCase } from "../validate-check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeValidateUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateUseCase(checkInsRepository)

    return useCase
}