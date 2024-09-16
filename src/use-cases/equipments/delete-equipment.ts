import { EquipmentNotFoundError } from '@/use-cases/errors/equipment-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import { EquipmentRepository } from '@/repositories/equipment-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'
import { UserRepository } from '@/repositories/user-repository'

interface DeleteEquipmentUseCaseRequest {
  equipmentId: string
  userId: string
}

export class DeleteEquipmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    equipmentId,
    userId,
  }: DeleteEquipmentUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const equipment = await this.equipmentRepository.findById(equipmentId)
    if (!equipment) throw new EquipmentNotFoundError()

    await this.equipmentRepository.delete(equipmentId)

    await this.logRepository.create({
      action: LogAction.DELETE,
      details: `Equipamento ${equipment.name} deletado por ${user.name}`,
      entity: LogEntities.EQUIPMENTS,
      entity_id: equipment.id,
      user_id: userId,
    })
  }
}
