import { GetEquipmentUseCase } from '@/use-cases/equipments/get-equipment'

import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeGetEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetEquipmentUseCase(equipmentRepository, userRepository)

  return useCase
}
