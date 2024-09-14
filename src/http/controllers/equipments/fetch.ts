import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchEquipmentsUseCase } from '@/use-cases/factories/equipments/make-fetch-equipments-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchEquipments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEquipmentsUseCase = makeFetchEquipmentsUseCase()

  const { equipments } = await fetchEquipmentsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(returnData({ equipments }))
}
