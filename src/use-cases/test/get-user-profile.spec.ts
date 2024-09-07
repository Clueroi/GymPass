import {expect, it, describe} from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found-error'

describe('Get User profile Use Case', ()=>{

    it('should be able to get user profile', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const sut = new GetUserProfileUseCase(inMemoryRepo)

        const createdUser = await inMemoryRepo.create({
            name:'Eric',
            email:'eric@gmail.com',
            password_hash: await hash('123345', 6)
        })

        
        const { user } = await sut.execute({
            userId:createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('Eric')
    })

    it('should not be able to get user profile with wrong ID', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const sut = new GetUserProfileUseCase(inMemoryRepo)

        await expect(()=>
            sut.execute({
                userId:'non-existing-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })
})