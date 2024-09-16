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

export interface LogRepository {
  findManyByUserId(userId: string): Promise<Log[]>
  create(log: Prisma.LogUncheckedCreateInput): Promise<Log>
}
