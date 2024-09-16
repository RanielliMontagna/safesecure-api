import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateEmployeeUseCase } from '@/use-cases/factories/employees/make-update-employee-use-case'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { returnData } from '@/utils/returnData'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function updateEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmployeeQuerySchema = z.object({ id: z.string() })

  const { id } = updateEmployeeQuerySchema.parse(request.params)

  const updateEmployeeBodySchema = z.object({
    name: z.string(),
    cpf: z.string().refine((cpf) => cpf.replace(/\D/g, '').length === 11, {
      message: 'CPF informado é inválido',
    }),
    registration: z.number(),
    sector: z.string(),
  })

  const { name, cpf, registration, sector } = updateEmployeeBodySchema.parse(
    request.body,
  )

  const updateEmployeeUseCase = makeUpdateEmployeeUseCase()

  try {
    const { employee } = await updateEmployeeUseCase.execute({
      name,
      cpf,
      registration,
      sector,
      employeeId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(
      returnData({
        id: employee.id,
        name: employee.name,
        cpf: employee.cpf,
        registration: employee.registration,
        sector: employee.sector,
      }),
    )
  } catch (err) {
    if (
      err instanceof EmployeeNotFoundError ||
      err instanceof UserNotFoundError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
