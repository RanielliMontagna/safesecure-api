import { EmployeeRepository } from '@/repositories/employee-repository'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'

interface DeleteEmployeeUseCaseRequest {
  employeeId: string
}

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({ employeeId }: DeleteEmployeeUseCaseRequest): Promise<void> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    await this.employeeRepository.delete(employeeId)
  }
}
