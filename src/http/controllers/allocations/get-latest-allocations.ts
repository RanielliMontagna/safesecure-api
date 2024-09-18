import { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { returnData } from '@/utils/returnData'

import { makeGetLatestAllocationsUseCase } from '@/use-cases/factories/allocations/make-get-latest-allocations-use-case'

export async function getLatestAllocations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAllocationsUseCase = makeGetLatestAllocationsUseCase()

    const { allocations } = await fetchAllocationsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData({ allocations }))
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
