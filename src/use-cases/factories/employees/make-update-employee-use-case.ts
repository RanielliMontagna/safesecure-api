import { UpdateEmployeeUseCase } from '@/use-cases/employees/update-employee'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'

export function makeUpdateEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()

  const useCase = new UpdateEmployeeUseCase(employeeRepository)

  return useCase
}
