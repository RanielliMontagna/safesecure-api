import { Log } from '@prisma/client'

import {
  FindManyByUserIdOptions,
  LogRepository,
} from '@/repositories/log-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface FetchLogsUseCaseRequest {
  userId: string
  options?: Pick<FindManyByUserIdOptions, 'search'>
}

interface FetchLogsUseCaseResponse {
  logs:
    | {
        id: Log['id']
        action: Log['action']
        entity: Log['entity']
        details: Log['details']
        createdAt: Log['created_at']
      }[]
    | null
}

export class FetchLogsUseCase {
  constructor(
    private logRepository: LogRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    options,
  }: FetchLogsUseCaseRequest): Promise<FetchLogsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const logs = await this.logRepository.findManyByUserId(userId, options)

    if (logs.length === 0 && !options?.search) {
      return { logs: null }
    }

    return {
      logs: logs.map((log) => ({
        id: log.id,
        action: log.action,
        entity: log.entity,
        details: log.details,
        createdAt: log.created_at,
      })),
    }
  }
}
