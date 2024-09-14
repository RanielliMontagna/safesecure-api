import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { EquipmentRepository } from '../equipment-repository'

export class PrismaEquipmentRepository implements EquipmentRepository {
  async findById(id: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        code: true,
        name: true,
        category: { select: { id: true, name: true } },
        quantity: true,
        available_quantity: true,
      },
    })

    if (!equipment) return null

    return equipment
  }

  async findByCode(code: number, userId: string) {
    const equipment = await prisma.equipment.findFirst({
      where: { code, user_id: userId, deleted_at: null },
      select: {
        id: true,
        code: true,
        name: true,
        category: { select: { id: true, name: true } },
        quantity: true,
        available_quantity: true,
      },
    })

    if (!equipment) return null

    return equipment
  }

  async findManyByUserId(userId: string) {
    const equipments = await prisma.equipment.findMany({
      where: { user_id: userId, deleted_at: null },
      select: {
        id: true,
        code: true,
        name: true,
        category: { select: { id: true, name: true } },
        quantity: true,
        available_quantity: true,
      },
    })

    return equipments
  }

  async create(equipment: Prisma.EquipmentUncheckedCreateInput) {
    const createdEquipment = await prisma.equipment.create({
      data: equipment,
    })

    return createdEquipment
  }

  async update(equipment: Prisma.EquipmentUncheckedUpdateInput) {
    const updatedEquipment = await prisma.equipment.update({
      where: { id: equipment.id as string },
      data: equipment,
    })

    return updatedEquipment
  }

  async delete(id: string) {
    await prisma.equipment.update({
      where: { id },
      data: { deleted_at: new Date() },
    })
  }

  async allocate(equipmentId: string, allocatedQuantity: number) {
    const equipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: { available_quantity: { decrement: allocatedQuantity } },
      select: { id: true, quantity: true, available_quantity: true },
    })

    return equipment
  }

  async returnAllocation(equipmentId: string, allocatedQuantity: number) {
    const equipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: { available_quantity: { increment: allocatedQuantity } },
      select: { id: true, quantity: true, available_quantity: true },
    })

    return equipment
  }
}
