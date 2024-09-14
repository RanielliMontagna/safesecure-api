import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateEquipmentUseCase } from '@/use-cases/factories/equipments/make-create-equipment-use-case'
import { EquipmentAlreadyExistsError } from '@/use-cases/errors/equipment-already-exists'

import { returnData } from '@/utils/returnData'
import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'

export async function createEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEquipmentBodySchema = z.object({
    code: z.number(),
    name: z.string(),
    categoryId: z.string(),
    quantity: z.number().optional(),
  })

  const { code, name, categoryId, quantity } = createEquipmentBodySchema.parse(
    request.body,
  )

  const createEquipmentUseCase = makeCreateEquipmentUseCase()

  try {
    const { equipment } = await createEquipmentUseCase.execute({
      code,
      name,
      categoryId,
      quantity,
      userId: request.user.sub,
    })

    return reply.status(201).send(returnData({ id: equipment.id }))
  } catch (err) {
    if (err instanceof CategoryNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    if (err instanceof EquipmentAlreadyExistsError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
