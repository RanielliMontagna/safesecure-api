import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeReturnAllocationUseCase } from '@/use-cases/factories/allocations/make-return-allocation-use-case'
import { AllocationNotFoundError } from '@/use-cases/errors/allocation-not-found-error'
import { returnData } from '@/utils/returnData'

export async function returnAllocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const returnAllocationQuerySchema = z.object({ id: z.string() })
  const { id } = returnAllocationQuerySchema.parse(request.params)

  const returnAllocationUseCase = makeReturnAllocationUseCase()

  try {
    const { allocation } = await returnAllocationUseCase.execute({
      allocationId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData(allocation))
  } catch (err) {
    if (err instanceof AllocationNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
