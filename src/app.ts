import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

import { ZodError } from 'zod'

import { env } from '@/env'
import { publicRoutes } from '@/http/controllers/public/routes'

export const app = fastify({})

app.register(cors, {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://safesecure-api.onrender.com',
  ],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(publicRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Implement a logger here (e.g. Sentry, Bugsnag, etc.)
  }

  return reply.status(500).send({
    title: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  })
})
