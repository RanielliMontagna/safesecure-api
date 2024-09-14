import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetchEquipments } from './fetch'
import { getEquipment } from './get'
import { createEquipment } from './create'
import { updateEquipment } from './update'
import { deleteEquipment } from './delete'

export async function equipmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/equipments', fetchEquipments)
  app.get('/equipments/:id', getEquipment)
  app.post('/equipments', createEquipment)
  app.put('/equipments/:id', updateEquipment)
  app.delete('/equipments/:id', deleteEquipment)
}
