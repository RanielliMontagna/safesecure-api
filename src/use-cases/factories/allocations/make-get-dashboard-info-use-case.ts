import { GetDashboardInfoUseCase } from '@/use-cases/allocations/get-dashboard-info'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeGetDashboardInfoUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetDashboardInfoUseCase(
    allocationRepository,
    userRepository,
  )

  return useCase
}
