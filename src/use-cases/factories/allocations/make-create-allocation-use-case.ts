import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { CreateAllocationUseCase } from '@/use-cases/allocations/create-allocation'
import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaEquipmentRepository } from '@/repositories/prisma/prisma-equipment-repository'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeCreateAllocationUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const employeeRepository = new PrismaEmployeeRepository()
  const equipmentRepository = new PrismaEquipmentRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new CreateAllocationUseCase(
    allocationRepository,
    employeeRepository,
    equipmentRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
