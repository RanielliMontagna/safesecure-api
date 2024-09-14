import { Allocation, Prisma } from '@prisma/client'

export enum AllocationStatus {
  ALLOCATED = 0,
  RETURNED = 1,
}

export interface AllocationResponse {
  id: Allocation['id']
  equipment: { id: string; name: string }
  employee: { id: string; name: string }
  startDate: Allocation['start_date']
  endDate: Allocation['end_date']
  allocatedQuantity: Allocation['allocated_quantity']
  status: AllocationStatus
}

export interface AllocationRepository {
  findById(userId: string): Promise<AllocationResponse | null>
  findManyByUserId(userId: string): Promise<AllocationResponse[]>
  create(
    allocation: Prisma.AllocationUncheckedCreateInput,
  ): Promise<AllocationResponse>
  returnAllocation(id: string): Promise<AllocationResponse>
}
