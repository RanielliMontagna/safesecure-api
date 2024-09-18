import { Allocation, Prisma } from '@prisma/client'
import { Options } from '@/use-cases/options/options'

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

export interface FindManyByUserIdOptions extends Pick<Options, 'search'> {}

export interface AllocationRepository {
  findById(userId: string): Promise<AllocationResponse | null>
  findManyByUserId(
    userId: string,
    options?: FindManyByUserIdOptions,
  ): Promise<AllocationResponse[]>
  create(
    allocation: Prisma.AllocationUncheckedCreateInput,
  ): Promise<AllocationResponse>
  returnAllocation(id: string): Promise<AllocationResponse>
  getLatestAllocationByUserId(
    userId: string,
  ): Promise<AllocationResponse[] | null>
}
