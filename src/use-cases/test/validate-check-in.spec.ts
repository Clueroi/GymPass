import { inMemoryCheckInReposistory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { ValidateUseCase } from '../validate-check-in'
import { ResourceNotFound } from '../errors/resource-not-found-error'

describe('CheckIn Use Case', () => {

    let inMemoryRepo: inMemoryCheckInReposistory
    let sut: ValidateUseCase

    beforeEach(() => {
        // vi.useFakeTimers()

        inMemoryRepo = new inMemoryCheckInReposistory()
        sut = new ValidateUseCase(inMemoryRepo)

    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {

        const createdCheckIn = await inMemoryRepo.create({
            gym_id:'Gym-01',
            user_id:'User-01'
        })

        const {checkIn} = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.is_validated).toEqual(expect.any(Date))
        expect(inMemoryRepo.items[0].is_validated).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(()=>
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not be able to validate the check-in ater 20 minutes of its creation', async()=>{
        vi.setSystemTime(new Date(2023, 0, 1, 13, 30))
        
        const createdCheckIn = await inMemoryRepo.create({
            gym_id:'Gym-01',
            user_id:'User-01'
        })

        const twentyOneMinutesInMiliseconds = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)

        const {checkIn} = await sut.execute({
            checkInId: createdCheckIn.id
        })

        await expect(()=> sut.execute({
            checkInId:createdCheckIn.id,
        })).rejects.toBeInstanceOf(Error)
    })
})