import {expect, it, describe} from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use Case', ()=>{

    it('should authenticate Use Case', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryRepo)

        await inMemoryRepo.create({
            name:"Jack",
            email:'jacka@gmail.com',
            password_hash: await hash('123456', 6),
        })

        
        const { user } = await sut.execute({
            email:'jacka@gmail.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should not be able to authenticate with wrong email', async ()=>{
        const inMemoryRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryRepo)

        await expect(()=>
            sut.execute({
                email:'jacka@gmail.com',
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    
    
    it('should not be able to authenticate with wrong password', async ()=>{
        const inMemoryRepo = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(inMemoryRepo)

        inMemoryRepo.create({
            name:'Jack',
            email:'jacka@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(()=>
            sut.execute({
                email:'jacka@gmail.com',
                password:'123123'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})