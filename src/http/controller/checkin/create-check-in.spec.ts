import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUSer } from "@/utils/test/create-and-authenticate-user";

import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";

describe('CheckIn (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a checkIn', async () => {

        const { token } = await createAndAuthenticateUSer(app)

        const gym = await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                latitude:-46.4813004 ,
                longitude:-23.5792591
            }
        })

        const profileResponse = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            longitude: -46.4813004,
            latitude: -23.5792591,
        })

        expect(profileResponse.statusCode).toEqual(200)
    })
})