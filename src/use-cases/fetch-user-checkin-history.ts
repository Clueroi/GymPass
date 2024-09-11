import { CheckIn } from '@prisma/client'
import { checkInsRepository } from '@/repositories/prisma/check-ins-repository'


interface FetchUserCheckInHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
    constructor(
        private checkInsRepository: checkInsRepository
    ) { }

    async execute({
        userId,
        page
    }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns
        }

    }
}
