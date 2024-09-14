import { UpdateEquipmentUseCase } from '@/use-cases/equipments/update-equipment'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'

export function makeUpdateEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const categoryRepository = new PrismaCategoryRepository()

  const useCase = new UpdateEquipmentUseCase(
    equipmentRepository,
    categoryRepository,
  )

  return useCase
}
