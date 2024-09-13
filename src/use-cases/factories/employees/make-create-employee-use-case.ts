import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

import { CreateEmployeeUseCase } from '@/use-cases/employees/create-employee'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'

export function makeCreateEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new CreateEmployeeUseCase(employeeRepository, userRepository)

  return useCase
}
