import { UpdateEmployeeUseCase } from '@/use-cases/employees/update-employee'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaLogRepository } from '@/repositories/prisma/prisma-log-repository'

export function makeUpdateEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()
  const logRepository = new PrismaLogRepository()

  const useCase = new UpdateEmployeeUseCase(
    employeeRepository,
    userRepository,
    logRepository,
  )

  return useCase
}
