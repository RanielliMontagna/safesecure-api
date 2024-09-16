import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchLogsUseCase } from '@/use-cases/factories/logs/make-fetch-logs-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchLogs(request: FastifyRequest, reply: FastifyReply) {
  const fetchLogsUseCase = makeFetchLogsUseCase()

  const { logs } = await fetchLogsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(returnData({ logs }))
}
