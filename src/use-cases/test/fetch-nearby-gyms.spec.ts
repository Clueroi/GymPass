import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import {expect, it, describe, beforeEach} from 'vitest'
import { FetchNearbyGymsUseCase } from "../fetch-neraby-gyms";


let gymsRepository:inMemoryGymsRepository
let sut:FetchNearbyGymsUseCase


describe('fetch nearby gyms use case', ()=>{
    beforeEach(()=>{
        gymsRepository = new inMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async()=>{
        await gymsRepository.create({
            description:'banas',
            latitude: -23.5792591,
            longitude: -46.4813004,
            phone:'',
            title:'Near Gym'
        })

        await gymsRepository.create({
            description:'banas',
            latitude: -25.5792591,
            longitude: -47.4813004,
            phone:'',
            title:'Far Gym'
        })

        const {gyms} = await sut.execute({
            userLatitude: -23.5895587,
            userLongitude: -46.5066368,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title:'Near Gym'})])
    })
})