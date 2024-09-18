import {
  AllocationRepository,
  DashboardInfo,
} from '@/repositories/allocation-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface GetDashboardInfoUseCaseRequest {
  userId: string
}

interface GetDashboardInfoUseCaseResponse extends DashboardInfo {}

export class GetDashboardInfoUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: GetDashboardInfoUseCaseRequest): Promise<GetDashboardInfoUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const data = await this.allocationRepository.getDashboardInfo(userId)

    return { ...data }
  }
}
