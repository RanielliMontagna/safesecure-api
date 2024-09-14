import { Equipment, Prisma } from '@prisma/client'

interface EquipmentWithCategory {
  id: Equipment['id']
  code: Equipment['code']
  name: Equipment['name']
  category: { id: string; name: string }
  quantity: Equipment['quantity']
  available_quantity: Equipment['available_quantity']
}

interface EquipmentNewQuantity {
  id: Equipment['id']
  quantity: Equipment['quantity']
  available_quantity: Equipment['available_quantity']
}

export interface EquipmentRepository {
  findById(id: string): Promise<EquipmentWithCategory | null>
  findByCode(
    code: number,
    userId: string,
  ): Promise<EquipmentWithCategory | null>
  findManyByUserId(userId: string): Promise<EquipmentWithCategory[]>
  create(equipment: Prisma.EquipmentUncheckedCreateInput): Promise<Equipment>
  update(equipment: Prisma.EquipmentUncheckedUpdateInput): Promise<Equipment>
  delete(id: string): Promise<void>
  allocate(
    equipmentId: string,
    allocatedQuantity: number,
  ): Promise<EquipmentNewQuantity>
  returnAllocation(
    equipmentId: string,
    allocatedQuantity: number,
  ): Promise<EquipmentNewQuantity>
}
