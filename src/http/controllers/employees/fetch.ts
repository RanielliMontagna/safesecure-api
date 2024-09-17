import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchEmployeesUseCase } from '@/use-cases/factories/employees/make-fetch-employees-use-case'
import { returnData } from '@/utils/returnData'

export async function fetchEmployees(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEmployeesQuerySchema = z.object({ search: z.string().optional() })
  const { search } = fetchEmployeesQuerySchema.parse(request.query)

  const fetchEmployeesUseCase = makeFetchEmployeesUseCase()

  const { employees } = await fetchEmployeesUseCase.execute({
    userId: request.user.sub,
    options: { search },
  })

  return reply.status(200).send(returnData({ employees }))
}
