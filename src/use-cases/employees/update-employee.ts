import type { EmployeeRepository } from '@/repositories/employee-repository'

import type {
  CreateEmployeeUseCaseRequest,
  CreateEmployeeUseCaseResponse,
} from './create-employee'

import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'

interface UpdateEmployeeCaseRequest
  extends Partial<CreateEmployeeUseCaseRequest> {
  employeeId: string
}

interface UpdateEmployeeCaseResponse extends CreateEmployeeUseCaseResponse {}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    name,
    cpf,
    registration,
    sector,
    userId,
    employeeId,
  }: UpdateEmployeeCaseRequest): Promise<UpdateEmployeeCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    const updatedEmployee = await this.employeeRepository.update({
      id: employeeId,
      name: name,
      cpf: cpf,
      registration: registration,
      sector: sector,
      user_id: userId,
    })

    return { employee: updatedEmployee }
  }
}
