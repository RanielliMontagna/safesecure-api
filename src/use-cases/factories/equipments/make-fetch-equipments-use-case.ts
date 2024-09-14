import { FetchEquipmentsUseCase } from '@/use-cases/equipments/fetch-equipments'

import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeFetchEquipmentsUseCase() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new FetchEquipmentsUseCase(
    equipmentRepository,
    userRepository,
  )

  return useCase
}
