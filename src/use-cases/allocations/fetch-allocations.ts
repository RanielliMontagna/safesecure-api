import { Allocation } from '@prisma/client'

import { AllocationRepository } from '@/repositories/allocation-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface FetchAllocationsUseCaseRequest {
  userId: string
}

interface FetchAllocationsUseCaseResponse {
  allocations: {
    id: Allocation['id']
    equipment: { id: string; name: string }
    employee: { id: string; name: string }
    startDate: Allocation['start_date']
    endDate: Allocation['end_date']
    allocatedQuantity: Allocation['allocated_quantity']
    status: Allocation['status']
  }[]
}

export class FetchAllocationsUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: FetchAllocationsUseCaseRequest): Promise<FetchAllocationsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const allocations = await this.allocationRepository.findManyByUserId(userId)

    return {
      allocations: allocations.map((allocation) => ({
        id: allocation.id,
        equipment: allocation.equipment,
        employee: allocation.employee,
        startDate: allocation.startDate,
        endDate: allocation.endDate,
        allocatedQuantity: allocation.allocatedQuantity,
        status: allocation.status,
      })),
    }
  }
}
