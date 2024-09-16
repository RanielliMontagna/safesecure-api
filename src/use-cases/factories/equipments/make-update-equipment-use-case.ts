import { UpdateEquipmentUseCase } from '@/use-cases/equipments/update-equipment'

import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeUpdateEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const categoryRepository = new PrismaCategoryRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new UpdateEquipmentUseCase(
    equipmentRepository,
    categoryRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
