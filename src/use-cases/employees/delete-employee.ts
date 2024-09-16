import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import { EmployeeRepository } from '@/repositories/employee-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'
import { UserRepository } from '@/repositories/user-repository'

interface DeleteEmployeeUseCaseRequest {
  employeeId: string
  userId: string
}

export class DeleteEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    employeeId,
    userId,
  }: DeleteEmployeeUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const employee = await this.employeeRepository.findById(employeeId)
    if (!employee) throw new EmployeeNotFoundError()

    await this.logRepository.create({
      action: LogAction.DELETE,
      details: `Funcionário ${employee.name} deletado por ${user.name}`,
      entity: LogEntities.EMPLOYEES,
      entity_id: employee.id,
      user_id: userId,
    })

    await this.employeeRepository.delete(employeeId)
  }
}
