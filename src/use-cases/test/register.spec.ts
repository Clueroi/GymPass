import {expect, it, describe} from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists-error'

describe('Register Use Case', ()=>{

    it('should register Use Case', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepo)

        
        const { user } = await registerUseCase.execute({
            name:'JackNoOne',
            email:'jacka@gmail.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepo)

        
        const { user } = await registerUseCase.execute({
            name:'JackNoOne',
            email:'jacka@gmail.com',
            password:'123456'
        })

        const isUserPasswordHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isUserPasswordHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async ()=>{

        const inMemoryRepo = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepo)

        const email = 'jacka@gmail.com'

        const { user } = await registerUseCase.execute({
            name:'JackNoOne',
            email,
            password:'123456'
        })

        await expect(()=>
            registerUseCase.execute({
                name:'JackNoOne',
                email,
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExists)
    })
})