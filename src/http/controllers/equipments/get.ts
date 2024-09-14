import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetEquipmentUseCase } from '@/use-cases/factories/equipments/make-get-equipment-use-case'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'

import { returnData } from '@/utils/returnData'

export async function getEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEquipmentQuerySchema = z.object({ id: z.string() })

  const { id } = getEquipmentQuerySchema.parse(request.params)

  const getEquipmentUseCase = makeGetEquipmentUseCase()

  try {
    const { equipment } = await getEquipmentUseCase.execute({
      equipmentId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData({ equipment }))
  } catch (err) {
    if (err instanceof EquipmentNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
