import { ReturnAllocationUseCase } from '@/use-cases/allocations/return-allocation'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'

export function makeReturnAllocationUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new ReturnAllocationUseCase(
    allocationRepository,
    equipmentRepository,
    userRepository,
  )

  return useCase
}
