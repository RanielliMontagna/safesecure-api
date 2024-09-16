import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeDeleteEquipmentUseCase } from '@/use-cases/factories/equipments/make-delete-equipment-use-case'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function deleteEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteEquipmentQuerySchema = z.object({ id: z.string() })

  const { id } = deleteEquipmentQuerySchema.parse(request.params)

  try {
    const deleteEquipmentUseCase = makeDeleteEquipmentUseCase()

    await deleteEquipmentUseCase.execute({
      equipmentId: id,
      userId: request.user.sub,
    })
  } catch (err) {
    if (
      err instanceof EquipmentNotFoundError ||
      err instanceof UserNotFoundError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }

  return reply.status(204).send()
}
