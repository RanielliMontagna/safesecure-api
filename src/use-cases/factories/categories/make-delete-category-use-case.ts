import { DeleteCategoryUseCase } from '@/use-cases/categories/delete-category'

import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeDeleteCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new DeleteCategoryUseCase(
    categoryRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
