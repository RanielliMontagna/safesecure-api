import { Employee } from '@prisma/client'

import { EmployeeAlreadyExistsError } from '@/use-cases/errors/employee-already-exists'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import { EmployeeRepository } from '@/repositories/employee-repository'
import { UserRepository } from '@/repositories/user-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'

export interface CreateEmployeeUseCaseRequest {
  name: string
  cpf: string
  registration: number
  sector: string
  userId: string
}

export interface CreateEmployeeUseCaseResponse {
  employee: Employee
}

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    name,
    cpf,
    registration,
    sector,
    userId,
  }: CreateEmployeeUseCaseRequest): Promise<CreateEmployeeUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const employeeAlreadyExists =
      await this.employeeRepository.findByCpfOrRegistration(cpf, registration)

    if (employeeAlreadyExists) {
      throw new EmployeeAlreadyExistsError()
    }

    const employee = await this.employeeRepository.create({
      name,
      cpf: cpf.replace(/\D/g, ''),
      registration,
      sector,
      user_id: userId,
    })

    await this.logRepository.create({
      action: LogAction.CREATE,
      details: `Funcionário ${employee.name} criado por ${user.name}`,
      entity: LogEntities.EMPLOYEES,
      entity_id: employee.id,
      user_id: userId,
    })

    return { employee }
  }
}
