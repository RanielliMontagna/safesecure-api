import { Employee } from '@prisma/client'

import {
  EmployeeRepository,
  FindManyByUserIdOptions,
} from '@/repositories/employee-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface FetchEmployeesUseCaseRequest {
  userId: string
  options?: Pick<FindManyByUserIdOptions, 'search'>
}

interface FetchEmployeesUseCaseResponse {
  employees: {
    id: Employee['id']
    name: Employee['name']
    cpf: Employee['cpf']
    registration: Employee['registration']
    sector: Employee['sector']
  }[]
}

export class FetchEmployeesUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    options,
  }: FetchEmployeesUseCaseRequest): Promise<FetchEmployeesUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const employees = await this.employeeRepository.findManyByUserId(
      userId,
      options,
    )

    return {
      employees: employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        cpf: employee.cpf,
        registration: employee.registration,
        sector: employee.sector,
      })),
    }
  }
}
