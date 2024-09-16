import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { LogRepository } from '../log-repository'

export class PrismaLogRepository implements LogRepository {
  async findManyByUserId(userId: string) {
    const logs = await prisma.log.findMany({
      where: { user_id: userId },
    })

    return logs
  }

  async create(log: Prisma.LogUncheckedCreateInput) {
    const createdLog = await prisma.log.create({ data: log })

    return createdLog
  }
}
