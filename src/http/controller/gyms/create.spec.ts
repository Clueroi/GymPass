import request from "supertest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUSer } from "@/utils/test/create-and-authenticate-user";

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create gym', async () => {

        const { token } = await createAndAuthenticateUSer(app)

        const profileResponse = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'JavaScript Gym',
            description:'Somethig',
            phone:'2222222',
            longitude: -46.4813004,
            latitude: -23.5792591,
        })

        expect(profileResponse.statusCode).toEqual(201)
    })
})