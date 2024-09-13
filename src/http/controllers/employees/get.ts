import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetEmployeeUseCase } from '@/use-cases/factories/employees/make-get-employee-use-case'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'

import { returnData } from '@/utils/returnData'

export async function getEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployeeQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = getEmployeeQuerySchema.parse(request.params)

  const getEmployeeUseCase = makeGetEmployeeUseCase()

  try {
    const { employee } = await getEmployeeUseCase.execute({
      employeeId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(returnData({ employee }))
  } catch (err) {
    if (err instanceof EmployeeNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
