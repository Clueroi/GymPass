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

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUSer(app)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'JavaScript Gym',
            description:'Somethig',
            phone:'2222222',
            latitude: -23.5792591,
            longitude: -46.4813004,
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            description:'banas',
            latitude: -25.3737385,
            longitude: -47.4813004,
            phone:'111111',
            title:'Far Gym'
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude:-25.3737385,
            longitude: -47.4813004,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:'JavaScript Gym'
            })
        ])
    })
})