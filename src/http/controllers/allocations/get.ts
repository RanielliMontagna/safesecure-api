import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetAllocationUseCase } from '@/use-cases/factories/allocations/make-get-allocation-use-case'
import { AllocationNotFoundError } from '@/use-cases/errors/allocation-not-found-error'

import { returnData } from '@/utils/returnData'

export async function getAllocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllocationQuerySchema = z.object({ id: z.string() })
  const { id } = getAllocationQuerySchema.parse(request.params)

  const getAllocationUseCase = makeGetAllocationUseCase()

  try {
    const { allocation } = await getAllocationUseCase.execute({
      allocationId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData({ allocation }))
  } catch (err) {
    if (err instanceof AllocationNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
