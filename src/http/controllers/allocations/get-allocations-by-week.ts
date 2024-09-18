import { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { returnData } from '@/utils/returnData'
import { makeGetAllocationsByWeekUseCase } from '@/use-cases/factories/allocations/make-get-allocations-by-week-use-case'

export async function getAllocationsGraphicsWeek(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAllocationsUseCase = makeGetAllocationsByWeekUseCase()

    const { week } = await fetchAllocationsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData({ week }))
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
