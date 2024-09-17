import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchEquipmentsUseCase } from '@/use-cases/factories/equipments/make-fetch-equipments-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchEquipments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEquipmentsQuerySchema = z.object({ search: z.string().optional() })
  const { search } = fetchEquipmentsQuerySchema.parse(request.query)

  const fetchEquipmentsUseCase = makeFetchEquipmentsUseCase()

  const { equipments } = await fetchEquipmentsUseCase.execute({
    userId: request.user.sub,
    options: { search },
  })

  return reply.status(200).send(returnData({ equipments }))
}
