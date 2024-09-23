import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factory/make-authenticate-use-case'

// post('/users', async...)
export async function refresh(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    await request.jwtVerify({
        onlyCookie: true
    })

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
            },
        },
    )

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d',
            },
        },
    )

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .status(200)
        .send({ token })
}