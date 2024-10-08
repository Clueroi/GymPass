import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { inMemoryCheckInReposistory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { CheckInUseCase } from '../check-ins'
import { Decimal } from '@prisma/client/runtime/library'

describe('CheckIn Use Case', () => {

    let inMemoryRepo: inMemoryCheckInReposistory
    let gymsRepository: inMemoryGymsRepository
    let sut: CheckInUseCase

    beforeEach(() => {
        vi.useFakeTimers()

        gymsRepository = new inMemoryGymsRepository
        inMemoryRepo = new inMemoryCheckInReposistory()
        sut = new CheckInUseCase(inMemoryRepo, gymsRepository)


        gymsRepository.items.push({
            id: 'Gym-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal (-23.5413323),
            longitude: new Decimal(-46.4676268),
        })

    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it.skip('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'Gym-01',
            userId: 'User-01',
            userLatitude: -23.5895587,
            userLongitude: -46.5066368
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it.skip('Should not be able to check-in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'Gym-01',
            userId: 'User-01',
            userLatitude: -23.5895587,
            userLongitude: -46.5066368
        })

        await expect(() =>
            sut.execute({
                gymId: 'Gym-01',
                userId: 'User-01',
                userLatitude: -23.5895587,
                userLongitude: -46.5066368
            }),
        ).rejects.toBeInstanceOf(Error)
    })

    it.skip('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'Gym-01',
            userId: 'User-01',
            userLatitude: -23.5895587,
            userLongitude: -46.5066368
        })

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'Gym-01',
            userId: 'User-01',
            userLatitude: -23.5895587,
            userLongitude: -46.5066368
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it.skip('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'Gym-02',
            description: "",
            latitude: new Decimal (-23.5413323),
            longitude: new Decimal(-46.4676268),
            phone: '',
            title: ''
        })

        await expect(()=> sut.execute({
            gymId: 'Gym-02',
            userId: 'User-01',
            userLatitude: -23.5895587,
            userLongitude: -46.5066368
        })
    ).rejects.toBeInstanceOf(Error)
        
    })
})