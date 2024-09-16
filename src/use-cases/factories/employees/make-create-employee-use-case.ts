import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { CreateEmployeeUseCase } from '@/use-cases/employees/create-employee'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeCreateEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new CreateEmployeeUseCase(
    employeeRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
