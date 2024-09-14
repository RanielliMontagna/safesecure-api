import { Category, Equipment } from '@prisma/client'

import { EquipmentRepository } from '@/repositories/equipment-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'

interface GetEquipmentUseCaseRequest {
  userId: string
  equipmentId: string
}

interface GetEquipmentUseCaseResponse {
  equipment: {
    id: Equipment['id']
    code: Equipment['code']
    name: Equipment['name']
    category: { id: Category['id']; name: Category['name'] }
    quantity: Equipment['quantity']
    available_quantity: Equipment['available_quantity']
  }
}

export class GetEquipmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    equipmentId,
  }: GetEquipmentUseCaseRequest): Promise<GetEquipmentUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new EquipmentNotFoundError()
    }

    return {
      equipment: {
        id: equipment.id,
        code: equipment.code,
        name: equipment.name,
        category: { id: equipment.category.id, name: equipment.category.name },
        quantity: equipment.quantity,
        available_quantity: equipment.available_quantity,
      },
    }
  }
}
