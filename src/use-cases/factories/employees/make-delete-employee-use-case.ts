import { DeleteEmployeeUseCase } from '@/use-cases/employees/delete-employee'

import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeDeleteEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new DeleteEmployeeUseCase(
    employeeRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
