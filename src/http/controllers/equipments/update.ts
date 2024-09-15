import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { returnData } from '@/utils/returnData'

import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { EquipmentInvalidQuantityError } from '@/use-cases/errors/equipment-invalid-quantity'

import { makeUpdateEquipmentUseCase } from '@/use-cases/factories/equipments/make-update-equipment-use-case'

export async function updateEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEquipmentQuerySchema = z.object({ id: z.string() })

  const { id } = updateEquipmentQuerySchema.parse(request.params)

  const updateEquipmentBodySchema = z.object({
    code: z.number(),
    name: z.string(),
    categoryId: z.string(),
    quantity: z.number().optional(),
  })

  const { code, name, quantity, categoryId } = updateEquipmentBodySchema.parse(
    request.body,
  )

  const updateEquipmentUseCase = makeUpdateEquipmentUseCase()

  try {
    const { equipment } = await updateEquipmentUseCase.execute({
      code,
      name,
      categoryId,
      quantity,
      equipmentId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(
      returnData({
        id: equipment.id,
        code: equipment.code,
        name: equipment.name,
        categoryId: equipment.category_id,
        quantity: equipment.quantity,
      }),
    )
  } catch (err) {
    if (
      err instanceof EquipmentNotFoundError ||
      err instanceof CategoryNotFoundError ||
      err instanceof EquipmentInvalidQuantityError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
