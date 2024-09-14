import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetchAllocations } from './fetch'
import { getAllocation } from './get'
import { createAllocation } from './create'
import { returnAllocation } from './update'

export async function allocationRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/allocations', fetchAllocations)
  app.get('/allocations/:id', getAllocation)
  app.post('/allocations', createAllocation)
  app.patch('/allocations/:id/return', returnAllocation)
}
