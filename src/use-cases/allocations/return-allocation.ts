import { Allocation } from '@prisma/client'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { AllocationNotFoundError } from '@/use-cases/errors/allocation-not-found-error'

import { UserRepository } from '@/repositories/user-repository'
import type { AllocationRepository } from '@/repositories/allocation-repository'
import { EquipmentRepository } from '@/repositories/equipment-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'

interface ReturnAllocationCaseRequest {
  allocationId: string
  userId: string
}

interface ReturnAllocationCaseResponse {
  allocation: {
    id: Allocation['id']
    equipment: { id: string; name: string }
    employee: { id: string; name: string }
    startDate: Allocation['start_date']
    endDate: Allocation['end_date']
    allocatedQuantity: Allocation['allocated_quantity']
    status: Allocation['status']
  }
}

export class ReturnAllocationUseCase {
  constructor(
    private allocationRepository: AllocationRepository,
    private equipmentRepository: EquipmentRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    allocationId,
    userId,
  }: ReturnAllocationCaseRequest): Promise<ReturnAllocationCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const allocation = await this.allocationRepository.findById(allocationId)
    if (!allocation) throw new AllocationNotFoundError()

    const equipment = await this.equipmentRepository.findById(
      allocation.equipment.id,
    )
    if (!equipment) throw new EquipmentNotFoundError()

    await this.equipmentRepository.returnAllocation(
      equipment.id,
      allocation.allocatedQuantity,
    )

    const updatedAllocation = await this.allocationRepository.returnAllocation(
      allocationId,
    )

    await this.logRepository.create({
      action: LogAction.UPDATE,
      entity: LogEntities.ALLOCATIONS,
      user_id: userId,
      entity_id: allocation.id,
      details: `A alocação de ${allocation.allocatedQuantity} unidade(s) do equipamento ${equipment.name} para o funcionário ${allocation.employee.name} foi devolvida pelo usuário ${user.name}`,
    })

    return {
      allocation: {
        id: updatedAllocation.id,
        equipment: updatedAllocation.equipment,
        employee: updatedAllocation.employee,
        startDate: updatedAllocation.startDate,
        endDate: updatedAllocation.endDate,
        allocatedQuantity: updatedAllocation.allocatedQuantity,
        status: updatedAllocation.status,
      },
    }
  }
}
