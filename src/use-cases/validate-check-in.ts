import { CheckIn } from '@prisma/client'
import { checkInsRepository } from '@/repositories/prisma/check-ins-repository'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'


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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.is_validated = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}
