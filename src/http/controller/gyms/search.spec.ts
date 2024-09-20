import request from "supertest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUSer } from "@/utils/test/create-and-authenticate-user";

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gyms', async () => {

        await request(app.server)
            .post('/users')
            .send({
                name: 'User-01',
                email: 'user@example.com',
                password: '123456'
            })

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'user@example.com',
                password: '123456'
            })

        const { token } = authResponse.body

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Somethig',
                phone: '2222222',
                longitude: -46.4813004,
                latitude: -23.5792591,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Somethig',
                phone: '11 99999-9999',
                longitude: -46.4813004,
                latitude: -23.5792591,
            })


        const response = await request(app.server)
            .get('/gyms/search')
            .set('Authorization', `Bearer${token}`)
            .query({
                q: 'JavaScript'
            })
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ])
    })
})