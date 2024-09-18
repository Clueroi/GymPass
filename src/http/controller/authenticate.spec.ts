import request from "supertest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { app } from "@/app";

describe('Authenticate(e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {

        await request(app.server).post('/users').send({
            name: 'User-01',
            email: 'user@example.com',
            password: '123456'
        })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'user@example.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})