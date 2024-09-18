import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { GetAllocationsByWeekUseCase } from '@/use-cases/allocations/get-allocations-by-week'

export function makeGetAllocationsByWeekUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetAllocationsByWeekUseCase(
    allocationRepository,
    userRepository,
  )

  return useCase
}
