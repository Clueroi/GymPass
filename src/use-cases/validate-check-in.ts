import { CheckIn } from '@prisma/client'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
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
        private checkInsRepository: PrismaCheckInsRepository,
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
