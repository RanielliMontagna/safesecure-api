import { ReturnAllocationUseCase } from '@/use-cases/allocations/return-allocation'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeReturnAllocationUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new ReturnAllocationUseCase(
    allocationRepository,
    equipmentRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
