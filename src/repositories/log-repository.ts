import { Options } from '@/use-cases/options/options'
import { Log, Prisma } from '@prisma/client'

export enum LogEntities {
  ALLOCATIONS = 'allocations',
  CATEGORIES = 'categories',
  EMPLOYEES = 'employees',
  EQUIPMENTS = 'equipments',
}

export enum LogAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface FindManyByUserIdOptions extends Pick<Options, 'search'> {}

export interface LogRepository {
  findManyByUserId(
    userId: string,
    options?: FindManyByUserIdOptions,
  ): Promise<Log[]>
  create(log: Prisma.LogUncheckedCreateInput): Promise<Log>
}
