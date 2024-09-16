import { FetchLogsUseCase } from '@/use-cases/logs/fetch-logs'

import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeFetchLogsUseCase() {
  const logRepository = new PrismaLogRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new FetchLogsUseCase(logRepository, userRepository)

  return useCase
}
