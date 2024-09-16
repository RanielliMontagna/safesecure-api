import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateEmployeeUseCase } from '@/use-cases/factories/employees/make-create-employee-use-case'
import { EmployeeAlreadyExistsError } from '@/use-cases/errors/employee-already-exists'

import { returnData } from '@/utils/returnData'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function createEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEmployeeBodySchema = z.object({
    name: z.string(),
    cpf: z.string().refine((cpf) => cpf.replace(/\D/g, '').length === 11, {
      message: 'CPF informado é inválido',
    }),
    registration: z.number(),
    sector: z.string(),
  })

  const { name, cpf, registration, sector } = createEmployeeBodySchema.parse(
    request.body,
  )

  const createEmployeeUseCase = makeCreateEmployeeUseCase()

  try {
    const { employee } = await createEmployeeUseCase.execute({
      name,
      cpf,
      registration,
      sector,
      userId: request.user.sub,
    })

    return reply.status(201).send(returnData({ id: employee.id }))
  } catch (err) {
    if (
      err instanceof EmployeeAlreadyExistsError ||
      err instanceof UserNotFoundError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
