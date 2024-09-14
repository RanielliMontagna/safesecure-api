import { FetchAllocationsUseCase } from '@/use-cases/allocations/fetch-allocations'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeFetchAllocationsUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new FetchAllocationsUseCase(
    allocationRepository,
    userRepository,
  )

  return useCase
}
