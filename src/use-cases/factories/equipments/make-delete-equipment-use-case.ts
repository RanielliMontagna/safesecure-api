import { DeleteEquipmentUseCase } from '@/use-cases/equipments/delete-equipment'

import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeDeleteEquipmentUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new DeleteEquipmentUseCase(
    equipmentRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
