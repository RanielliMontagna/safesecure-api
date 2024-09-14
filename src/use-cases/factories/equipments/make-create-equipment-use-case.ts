import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { CreateEquipmentUseCase } from '@/use-cases/equipments/create-equipment'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'

export function makeCreateEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const categoryRepository = new PrismaCategoryRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new CreateEquipmentUseCase(
    equipmentRepository,
    categoryRepository,
    userRepository,
  )

  return useCase
}
