import { Employee } from '@prisma/client'

import { EmployeeRepository } from '@/repositories/employee-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'

interface GetEmployeeUseCaseRequest {
  userId: string
  employeeId: string
}

interface GetEmployeeUseCaseResponse {
  employee: {
    id: Employee['id']
    name: Employee['name']
    cpf: Employee['cpf']
    registration: Employee['registration']
    sector: Employee['sector']
  }
}

export class GetEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    employeeId,
  }: GetEmployeeUseCaseRequest): Promise<GetEmployeeUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    return {
      employee: {
        id: employee.id,
        name: employee.name,
        cpf: employee.cpf,
        registration: employee.registration,
        sector: employee.sector,
      },
    }
  }
}
