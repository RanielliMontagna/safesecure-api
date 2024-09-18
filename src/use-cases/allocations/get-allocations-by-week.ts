import {
  AllocationRepository,
  AllocationWeek,
} from '@/repositories/allocation-repository'
import { UserRepository } from '@/repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface GetAllocationsByWeekUseCaseRequest {
  userId: string
}

interface GetAllocationsByWeekUseCaseResponse {
  week: AllocationWeek[]
}

export class GetAllocationsByWeekUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: GetAllocationsByWeekUseCaseRequest): Promise<GetAllocationsByWeekUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const week = await this.allocationRepository.getAllocationByWeek(userId)

    return { week }
  }
}
