import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchLogsUseCase } from '@/use-cases/factories/logs/make-fetch-logs-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchLogs(request: FastifyRequest, reply: FastifyReply) {
  const fetchCategoriesQuerySchema = z.object({ search: z.string().optional() })
  const { search } = fetchCategoriesQuerySchema.parse(request.query)

  const fetchLogsUseCase = makeFetchLogsUseCase()

  const { logs } = await fetchLogsUseCase.execute({
    userId: request.user.sub,
    options: { search },
  })

  return reply.status(200).send(returnData({ logs }))
}
