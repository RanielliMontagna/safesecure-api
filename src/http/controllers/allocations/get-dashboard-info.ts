import { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { returnData } from '@/utils/returnData'

import { makeGetDashboardInfoUseCase } from '@/use-cases/factories/allocations/make-get-dashboard-info-use-case'

export async function getDashboardInfo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAllocationsUseCase = makeGetDashboardInfoUseCase()

    const data = await fetchAllocationsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData(data))
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
