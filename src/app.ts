import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

import { setupFastifyErrorHandler } from '@sentry/node'
import '@/lib/sentry'

import { ZodError } from 'zod'

import { env } from '@/env'
import { publicRoutes } from '@/http/controllers/public/routes'
import { categoryRoutes } from '@/http/controllers/categories/routes'
import { employeeRoutes } from '@/http/controllers/employees/routes'
import { equipmentRoutes } from './http/controllers/equipments/routes'
import { allocationRoutes } from './http/controllers/allocations/routes'
import { logsRoutes } from './http/controllers/logs/routes'

export const app = fastify({})

setupFastifyErrorHandler(app)

app.register(cors, {
  origin: [
    'http://localhost:5173',
    'https://safesecure-front.vercel.app/',
    'https://safesecure-front.vercel.app',
    'https://safesecure-front-81ex4aa3y-raniellimontagnas-projects.vercel.app/',
    'https://safesecure-front-81ex4aa3y-raniellimontagnas-projects.vercel.app',
  ],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '7d' },
})

app.register(publicRoutes)
app.register(categoryRoutes)
app.register(employeeRoutes)
app.register(equipmentRoutes)
app.register(allocationRoutes)
app.register(logsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    title: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  })
})
