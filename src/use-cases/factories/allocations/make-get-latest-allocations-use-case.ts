import { GetLatestAllocationsByUserUseCase } from '@/use-cases/allocations/get-latest-allocations'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeGetLatestAllocationsUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetLatestAllocationsByUserUseCase(
    allocationRepository,
    userRepository,
  )

  return useCase
}
