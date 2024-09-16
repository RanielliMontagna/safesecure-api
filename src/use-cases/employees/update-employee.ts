import type {
  CreateEmployeeUseCaseRequest,
  CreateEmployeeUseCaseResponse,
} from './create-employee'

import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import type { EmployeeRepository } from '@/repositories/employee-repository'
import { UserRepository } from '@/repositories/user-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'

interface UpdateEmployeeCaseRequest
  extends Partial<CreateEmployeeUseCaseRequest> {
  employeeId: string
  userId: string
}

interface UpdateEmployeeCaseResponse extends CreateEmployeeUseCaseResponse {}

export class UpdateEmployeeUseCase {
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
    employeeId,
  }: UpdateEmployeeCaseRequest): Promise<UpdateEmployeeCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const employee = await this.employeeRepository.findById(employeeId)
    if (!employee) throw new EmployeeNotFoundError()

    const updatedEmployee = await this.employeeRepository.update({
      id: employeeId,
      name: name,
      cpf: cpf,
      registration: registration,
      sector: sector,
      user_id: userId,
    })

    await this.logRepository.create({
      action: LogAction.UPDATE,
      details: `Funcionário ${employee.name} atualizado por ${user.name}`,
      entity: LogEntities.EMPLOYEES,
      entity_id: employee.id,
      user_id: userId,
    })

    return { employee: updatedEmployee }
  }
}
