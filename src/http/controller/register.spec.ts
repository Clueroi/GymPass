import request from "supertest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { app } from "@/app";



describe('register(e2e)', () => {
beforeAll(async()=>{
    await app.ready()
})

afterAll(async()=>{
    await app.close()
})

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'User-01',
                email: 'user@example.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(201)
    })
})