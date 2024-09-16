import { CreateCategoryUseCase } from '@/use-cases/categories/create-category'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeCreateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new CreateCategoryUseCase(
    categoryRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
