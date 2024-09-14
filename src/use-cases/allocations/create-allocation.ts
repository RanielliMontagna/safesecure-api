import { Allocation } from '@prisma/client'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'

import { UserRepository } from '@/repositories/user-repository'
import { EmployeeRepository } from '@/repositories/employee-repository'
import { EquipmentRepository } from '@/repositories/equipment-repository'
import {
  AllocationRepository,
  AllocationStatus,
} from '@/repositories/allocation-repository'
import { AllocatedQuantityExceedsAvailableError } from '../errors/allocated-quantity-exceeds-available'

export interface CreateAllocationUseCaseRequest {
  equipmentId: string
  employeeId: string
  startDate: Date
  endDate?: Date
  allocatedQuantity: number
  userId: string
}

export interface CreateAllocationUseCaseResponse {
  allocation: {
    id: Allocation['id']
    equipment: { id: string; name: string }
    employee: { id: string; name: string }
    startDate: Date
    endDate?: Date
    allocatedQuantity: number
    status: Allocation['status']
  }
}

export class CreateAllocationUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private employeeRepository: EmployeeRepository,
    private equipmentRepository: EquipmentRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    equipmentId,
    employeeId,
    startDate,
    endDate,
    allocatedQuantity,
    userId,
  }: CreateAllocationUseCaseRequest): Promise<CreateAllocationUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const employee = await this.employeeRepository.findById(employeeId)
    if (!employee) throw new EmployeeNotFoundError()

    const equipment = await this.equipmentRepository.findById(equipmentId)
    if (!equipment) throw new EquipmentNotFoundError()

    if (allocatedQuantity > equipment.quantity) {
      throw new AllocatedQuantityExceedsAvailableError()
    }

    await this.equipmentRepository.allocate(equipmentId, allocatedQuantity)

    const allocation = await this.allocationRepository.create({
      equipment_id: equipmentId,
      employee_id: employeeId,
      start_date: startDate,
      end_date: endDate,
      allocated_quantity: allocatedQuantity,
      user_id: userId,
      status: AllocationStatus.ALLOCATED,
    })

    return {
      allocation: {
        id: allocation.id,
        equipment: { id: equipmentId, name: equipment.name },
        employee: { id: employeeId, name: employee.name },
        startDate,
        endDate,
        allocatedQuantity,
        status: allocation.status,
      },
    }
  }
}
