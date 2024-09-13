import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetchEmployees } from './fetch'
import { getEmployee } from './get'
import { createEmployee } from './create'
import { updateEmployee } from './update'
import { deleteEmployee } from './delete'

export async function employeeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/employees', fetchEmployees)
  app.get('/employees/:id', getEmployee)
  app.post('/employees', createEmployee)
  app.put('/employees/:id', updateEmployee)
  app.delete('/employees/:id', deleteEmployee)
}
