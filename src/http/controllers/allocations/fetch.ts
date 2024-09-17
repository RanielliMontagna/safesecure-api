import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchAllocationsUseCase } from '@/use-cases/factories/allocations/make-fetch-allocations-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchAllocations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCategoriesQuerySchema = z.object({ search: z.string().optional() })
  const { search } = fetchCategoriesQuerySchema.parse(request.query)

  const fetchAllocationsUseCase = makeFetchAllocationsUseCase()

  const { allocations } = await fetchAllocationsUseCase.execute({
    userId: request.user.sub,
    options: { search },
  })

  return reply.status(200).send(returnData({ allocations }))
}
