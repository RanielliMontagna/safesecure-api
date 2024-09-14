import { DeleteEquipmentUseCase } from '@/use-cases/equipments/delete-equipment'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'

export function makeDeleteEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()

  const useCase = new DeleteEquipmentUseCase(equipmentRepository)

  return useCase
}
