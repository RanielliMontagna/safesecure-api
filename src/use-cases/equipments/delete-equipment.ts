import { EquipmentRepository } from '@/repositories/equipment-repository'
import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'

interface DeleteEquipmentUseCaseRequest {
  equipmentId: string
}

export class DeleteEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}

  async execute({ equipmentId }: DeleteEquipmentUseCaseRequest): Promise<void> {
    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new EquipmentNotFoundError()
    }

    await this.equipmentRepository.delete(equipmentId)
  }
}
