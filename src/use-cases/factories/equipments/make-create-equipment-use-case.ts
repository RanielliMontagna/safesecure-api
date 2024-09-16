import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { CreateEquipmentUseCase } from '@/use-cases/equipments/create-equipment'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeCreateEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const categoryRepository = new PrismaCategoryRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new CreateEquipmentUseCase(
    equipmentRepository,
    categoryRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
