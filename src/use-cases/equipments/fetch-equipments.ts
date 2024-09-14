import { Category, Equipment } from '@prisma/client'

import { EquipmentRepository } from '@/repositories/equipment-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface FetchEquipmentsUseCaseRequest {
  userId: string
}

interface FetchEquipmentsUseCaseResponse {
  equipments: {
    id: Equipment['id']
    code: Equipment['code']
    name: Equipment['name']
    category: { name: Category['name'] }
    quantity: Equipment['quantity']
  }[]
}

export class FetchEquipmentsUseCase {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: FetchEquipmentsUseCaseRequest): Promise<FetchEquipmentsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const equipments = await this.equipmentRepository.findManyByUserId(userId)

    return {
      equipments: equipments.map((equipment) => ({
        id: equipment.id,
        code: equipment.code,
        name: equipment.name,
        category: { id: equipment.category.id, name: equipment.category.name },
        quantity: equipment.quantity,
      })),
    }
  }
}
