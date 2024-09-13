import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeDeleteEmployeeUseCase } from '@/use-cases/factories/employees/make-delete-employee-use-case'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'

export async function deleteEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteEmployeeQuerySchema = z.object({ id: z.string() })

  const { id } = deleteEmployeeQuerySchema.parse(request.params)

  try {
    const deleteEmployeeUseCase = makeDeleteEmployeeUseCase()

    await deleteEmployeeUseCase.execute({ employeeId: id })
  } catch (err) {
    if (err instanceof EmployeeNotFoundError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }

  return reply.status(204).send()
}
