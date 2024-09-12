import { FastifyInstance } from 'fastify'

import { check } from './health-check'
import { authenticate } from './authenticate'

export async function publicRoutes(app: FastifyInstance) {
  app.get('/health-check', check)
  app.post('/authenticate', authenticate)
}
