import { CheckIn } from '@prisma/client'
import { checkInsRepository } from '@/repositories/prisma/check-ins-repository'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'


interface ValidateUseCaseRequest {
    checkInId:string
}

interface ValidateUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateUseCase {
    constructor(
        private checkInsRepository: checkInsRepository,
    ) { }

    async execute({
        checkInId
    }: ValidateUseCaseRequest): Promise<ValidateUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId) 

        if (!checkIn) {
            throw new ResourceNotFound
        }

        checkIn.is_validated = new Date()

        return {
            checkIn
        }
    }
}
