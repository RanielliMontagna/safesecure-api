import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateAllocationUseCase } from '@/use-cases/factories/allocations/make-create-allocation-use-case'

import { returnData } from '@/utils/returnData'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { AllocatedQuantityExceedsAvailableError } from '@/use-cases/errors/allocated-quantity-exceeds-available'

export async function createAllocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAllocationBodySchema = z.object({
    employeeId: z.string().uuid(),
    equipmentId: z.string().uuid(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    allocatedQuantity: z.number(),
  })

  const { equipmentId, employeeId, startDate, endDate, allocatedQuantity } =
    createAllocationBodySchema.parse(request.body)

  const createAllocationUseCase = makeCreateAllocationUseCase()

  try {
    const { allocation } = await createAllocationUseCase.execute({
      equipmentId,
      employeeId,
      startDate,
      endDate,
      allocatedQuantity,
      userId: request.user.sub,
    })

    return reply.status(201).send(returnData({ id: allocation.id }))
  } catch (err) {
    if (
      err instanceof UserNotFoundError ||
      err instanceof EmployeeNotFoundError ||
      err instanceof EquipmentNotFoundError ||
      err instanceof AllocatedQuantityExceedsAvailableError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
