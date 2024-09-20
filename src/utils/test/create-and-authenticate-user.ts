import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUSer(app: FastifyInstance) {

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

    return {
        token,
    }
}