import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchEmployeesUseCase } from '@/use-cases/factories/employees/make-fetch-employees-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchEmployees(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEmployeesUseCase = makeFetchEmployeesUseCase()

  const { employees } = await fetchEmployeesUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(returnData({ employees }))
}
