import { Allocation } from '@prisma/client'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import { UserRepository } from '@/repositories/user-repository'
import {
  AllocationRepository,
  FindManyByUserIdOptions,
} from '@/repositories/allocation-repository'

interface FetchAllocationsUseCaseRequest {
  userId: string
  options?: Pick<FindManyByUserIdOptions, 'search'>
}

interface FetchAllocationsUseCaseResponse {
  allocations:
    | {
        id: Allocation['id']
        equipment: { id: string; name: string }
        employee: { id: string; name: string }
        startDate: Allocation['start_date']
        endDate: Allocation['end_date']
        allocatedQuantity: Allocation['allocated_quantity']
        status: Allocation['status']
      }[]
    | null
}

export class FetchAllocationsUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    options,
  }: FetchAllocationsUseCaseRequest): Promise<FetchAllocationsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const allocations = await this.allocationRepository.findManyByUserId(
      userId,
      options,
    )

    if (allocations.length === 0 && !options?.search) {
      return { allocations: null }
    }

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
