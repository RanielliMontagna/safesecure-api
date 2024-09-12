import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateCategoryUseCase } from '@/use-cases/factories/categories/make-create-category-use-case'
import { CategoryAlreadyExistsError } from '@/use-cases/errors/category-already-exists'

import { returnData } from '@/utils/returnData'

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const { name, description } = createCategoryBodySchema.parse(request.body)

  const createCategoryUseCase = makeCreateCategoryUseCase()

  try {
    const { category } = await createCategoryUseCase.execute({
      name,
      description,
      userId: request.user.sub,
    })

    return reply.status(201).send(returnData({ id: category.id }))
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
