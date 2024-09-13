import { DeleteEmployeeUseCase } from '@/use-cases/employees/delete-employee'
import { PrismaEmployeeRepository } from '@/repositories/prisma/prisma-employee-repository'

export function makeDeleteEmployeeUseCase() {
  const employeeRepository = new PrismaEmployeeRepository()

  const useCase = new DeleteEmployeeUseCase(employeeRepository)

  return useCase
}
