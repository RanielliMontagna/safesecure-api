import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchAllocationsUseCase } from '@/use-cases/factories/allocations/make-fetch-allocations-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchAllocations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAllocationsUseCase = makeFetchAllocationsUseCase()

  const { allocations } = await fetchAllocationsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(returnData({ allocations }))
}
