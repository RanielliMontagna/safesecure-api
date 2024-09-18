import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { FindManyByUserIdOptions, LogRepository } from '../log-repository'

export class PrismaLogRepository implements LogRepository {
  async findManyByUserId(userId: string, options?: FindManyByUserIdOptions) {
    const orArray: Prisma.LogWhereInput[] = [
      { details: { contains: options?.search, mode: 'insensitive' } },
      { entity: { contains: options?.search, mode: 'insensitive' } },
    ]

    const logs = await prisma.log.findMany({
      where: { user_id: userId, OR: options?.search ? orArray : undefined },
      orderBy: { created_at: 'desc' },
    })

    return logs
  }

  async create(log: Prisma.LogUncheckedCreateInput) {
    const createdLog = await prisma.log.create({ data: log })

    return createdLog
  }
}
