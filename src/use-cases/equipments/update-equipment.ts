import type { EquipmentRepository } from '@/repositories/equipment-repository'

import type {
  CreateEquipmentUseCaseRequest,
  CreateEquipmentUseCaseResponse,
} from './create-equipment'

import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { CategoryRepository } from '@/repositories/category-repository'
import { CategoryNotFoundError } from '../errors/category-not-found-error'
import { EquipmentInvalidQuantityError } from '../errors/equipment-invalid-quantity'

interface UpdateEquipmentCaseRequest {
  code?: CreateEquipmentUseCaseRequest['code']
  name?: CreateEquipmentUseCaseRequest['name']
  categoryId: CreateEquipmentUseCaseRequest['categoryId']
  quantity?: CreateEquipmentUseCaseRequest['quantity']
  userId: CreateEquipmentUseCaseRequest['userId']
  equipmentId: string
}

interface UpdateEquipmentCaseResponse extends CreateEquipmentUseCaseResponse {}

export class UpdateEquipmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    code,
    name,
    categoryId,
    quantity,
    userId,
    equipmentId,
  }: UpdateEquipmentCaseRequest): Promise<UpdateEquipmentCaseResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new EquipmentNotFoundError()
    }

    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    const newQuantity = quantity || equipment.quantity
    const diff = newQuantity - equipment.quantity
    const newAvailableQuantity = equipment.available_quantity + diff

    if (newAvailableQuantity < 0) {
      throw new EquipmentInvalidQuantityError()
    }

    const updatedEquipment = await this.equipmentRepository.update({
      id: equipmentId,
      code,
      name,
      category_id: categoryId,
      quantity: newQuantity,
      available_quantity: newAvailableQuantity,
      user_id: userId,
    })

    return { equipment: updatedEquipment }
  }
}
