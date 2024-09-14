import { Allocation } from '@prisma/client'

import { AllocationRepository } from '@/repositories/allocation-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { AllocationNotFoundError } from '@/use-cases/errors/allocation-not-found-error'

interface GetAllocationUseCaseRequest {
  userId: string
  allocationId: string
}

interface GetAllocationUseCaseResponse {
  allocation: {
    id: Allocation['id']
    equipment: { id: string; name: string }
    employee: { id: string; name: string }
    startDate: Allocation['start_date']
    endDate: Allocation['end_date']
    allocatedQuantity: Allocation['allocated_quantity']
    status: Allocation['status']
  }
}

export class GetAllocationUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    allocationId,
  }: GetAllocationUseCaseRequest): Promise<GetAllocationUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const allocation = await this.allocationRepository.findById(allocationId)

    if (!allocation) {
      throw new AllocationNotFoundError()
    }

    return {
      allocation: {
        id: allocation.id,
        equipment: allocation.equipment,
        employee: allocation.employee,
        startDate: allocation.startDate,
        endDate: allocation.endDate,
        allocatedQuantity: allocation.allocatedQuantity,
        status: allocation.status,
      },
    }
  }
}
