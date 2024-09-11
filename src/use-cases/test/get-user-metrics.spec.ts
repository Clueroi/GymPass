import { inMemoryCheckInReposistory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics'

describe('get user metrics Use Case', () => {

    let inMemoryRepo: inMemoryCheckInReposistory
    let sut: GetUserMetricsUseCase

    beforeEach(() => {
        inMemoryRepo = new inMemoryCheckInReposistory()
        sut = new GetUserMetricsUseCase(inMemoryRepo)
    })


    it('should be able to get check-ins count from metrics', async () => {
        
        await inMemoryRepo.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })

        await inMemoryRepo.create({
            gym_id:'gym-02',
            user_id:'user-02'
        })

        const {checkInsCount} = await sut.execute({
            userId: 'user-01'
        })

        expect(checkInsCount).toEqual(2)
    })
})