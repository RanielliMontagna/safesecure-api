import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateCategoryUseCase } from '@/use-cases/factories/categories/make-update-category-use-case'
import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { returnData } from '@/utils/returnData'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function updateCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCategoryQuerySchema = z.object({ id: z.string() })

  const { id } = updateCategoryQuerySchema.parse(request.params)

  const updateCategoryBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const { name, description } = updateCategoryBodySchema.parse(request.body)

  const updateCategoryUseCase = makeUpdateCategoryUseCase()

  try {
    const { category } = await updateCategoryUseCase.execute({
      name,
      description,
      categoryId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send(
      returnData({
        id: category.id,
        name: category.name,
        description: category.description,
      }),
    )
  } catch (err) {
    if (
      err instanceof CategoryNotFoundError ||
      err instanceof UserNotFoundError
    ) {
      reply.status(400).send({ message: err.message })
      return
    }

    throw err
  }
}
