import { FetchEmployeesUseCase } from '@/use-cases/employees/fetch-employees'

import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeFetchEmployeesUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()
  const userRepository = new PrismaUserRepository()

  const useCase = new FetchEmployeesUseCase(employeeRepository, userRepository)

  return useCase
}
