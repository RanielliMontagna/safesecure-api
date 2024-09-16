import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetchLogs } from './fetch'

export async function logsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/logs', fetchLogs)
}
