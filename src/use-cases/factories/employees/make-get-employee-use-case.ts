import { GetEmployeeUseCase } from '@/use-cases/employees/get-employee'

import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeGetEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new GetEmployeeUseCase(employeeRepository, userRepository)

  return useCase
}
