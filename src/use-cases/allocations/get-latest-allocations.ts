import { Allocation } from '@prisma/client'

import { AllocationRepository } from '@/repositories/allocation-repository'
import { UserRepository } from '@/repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface GetLatestAllocationsByUserUseCaseRequest {
  userId: string
}

interface GetLatestAllocationsByUserUseCaseResponse {
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

export class GetLatestAllocationsByUserUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: GetLatestAllocationsByUserUseCaseRequest): Promise<GetLatestAllocationsByUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const allocations =
      await this.allocationRepository.getLatestAllocationByUserId(userId)

    return { allocations }
  }
}
