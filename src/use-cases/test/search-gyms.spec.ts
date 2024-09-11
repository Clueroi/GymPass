import { expect, it, describe, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from '../search-gym'

describe('CheckIn Use Case', () => {

    let gymsRepository: inMemoryGymsRepository
    let sut: SearchGymUseCase

    beforeEach(() => {
        gymsRepository = new inMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: 'banas',
            latitude: -23.5792591,
            longitude: -46.4813004,
            phone: '',
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: 'banas',
            latitude: -27.5792591,
            longitude: -49.4813004,
            phone: '',
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'TypeScript Gym' }),
        ])
    })

    it.skip('should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `TypeScript Gym ${i}`,
                description: 'banas',
                latitude: -27.5792591,
                longitude: -49.4813004,
                phone: '',
            })
        }

        const { gyms } = await sut.execute({
            query: 'TypeScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: `TypeScript Gym 21`}),
            expect.objectContaining({  title: `TypeScript Gym 22`}),
        ])
    })
})