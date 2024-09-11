import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import {expect, describe, it, beforeEach} from 'vitest'
import { CreateGymUseCase } from "../create-gym";
import { Decimal } from "@prisma/client/runtime/library";


let gymRepository:inMemoryGymsRepository
let sut:CreateGymUseCase

describe('Register use case', ()=>{
    beforeEach(()=>{
        gymRepository = new inMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    it('should be able to register a new gym', async ()=>{
        const {gym} = await sut.execute({
            description:'banas',
            latitude: -23.5792591,
            longitude: -46.4813004,
            phone:'',
            title:'Alanzoka... Mais aguardado do que a copa'
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})