import { GetAllocationUseCase } from '@/use-cases/allocations/get-allocation'

import { PrismaAllocationRepository } from '@/repositories/prisma/prisma-allocation-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeGetAllocationUseCase() {
  const allocationRepository = new PrismaAllocationRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetAllocationUseCase(allocationRepository, userRepository)

  return useCase
}
