import { Equipment } from '@prisma/client'

import { EquipmentRepository } from '@/repositories/equipment-repository'
import { UserRepository } from '@/repositories/user-repository'

import { EquipmentAlreadyExistsError } from '@/use-cases/errors/equipment-already-exists'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { CategoryRepository } from '@/repositories/category-repository'
import { CategoryNotFoundError } from '../errors/category-not-found-error'

export interface CreateEquipmentUseCaseRequest {
  code: number
  name: string
  categoryId: string
  quantity?: number
  userId: string
}

export interface CreateEquipmentUseCaseResponse {
  equipment: Equipment
}

export class CreateEquipmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    code,
    name,
    categoryId,
    quantity,
    userId,
  }: CreateEquipmentUseCaseRequest): Promise<CreateEquipmentUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    const equipmentAlreadyExists = await this.equipmentRepository.findByCode(
      code,
      userId,
    )

    if (equipmentAlreadyExists) {
      throw new EquipmentAlreadyExistsError()
    }

    const equipment = await this.equipmentRepository.create({
      name,
      code,
      category_id: categoryId,
      quantity,
      available_quantity: quantity,
      user_id: userId,
    })

    return { equipment }
  }
}
