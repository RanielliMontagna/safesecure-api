import { Prisma } from '@prisma/client'

import {
  AllocationRepository,
  AllocationStatus,
  FindManyByUserIdOptions,
} from '@/repositories/allocation-repository'
import { prisma } from '@/lib/prisma'

const selectObject = {
  id: true,
  equipment: { select: { id: true, name: true } },
  employee: { select: { id: true, name: true } },
  start_date: true,
  end_date: true,
  allocated_quantity: true,
  status: true,
}

export class PrismaAllocationRepository implements AllocationRepository {
  async findById(userId: string) {
    const allocation = await prisma.allocation.findUnique({
      where: { id: userId },
      select: selectObject,
    })

    if (!allocation) return null

    return {
      id: allocation.id,
      equipment: allocation.equipment,
      employee: allocation.employee,
      startDate: allocation.start_date,
      endDate: allocation.end_date,
      allocatedQuantity: allocation.allocated_quantity,
      status: allocation.status,
    }
  }

  async findManyByUserId(userId: string, options?: FindManyByUserIdOptions) {
    const orArray: Prisma.AllocationWhereInput[] = [
      {
        equipment: { name: { contains: options?.search, mode: 'insensitive' } },
      },
      {
        employee: { name: { contains: options?.search, mode: 'insensitive' } },
      },
    ]

    const allocations = await prisma.allocation.findMany({
      where: { user_id: userId, OR: options?.search ? orArray : undefined },
      select: selectObject,
    })

    return allocations.map((allocation) => ({
      id: allocation.id,
      equipment: allocation.equipment,
      employee: allocation.employee,
      startDate: allocation.start_date,
      endDate: allocation.end_date,
      allocatedQuantity: allocation.allocated_quantity,
      status: allocation.status,
    }))
  }

  async create(allocation: Prisma.AllocationUncheckedCreateInput) {
    const createdAllocation = await prisma.allocation.create({
      data: allocation,
      select: selectObject,
    })

    return {
      id: createdAllocation.id,
      equipment: createdAllocation.equipment,
      employee: createdAllocation.employee,
      startDate: createdAllocation.start_date,
      endDate: createdAllocation.end_date,
      allocatedQuantity: createdAllocation.allocated_quantity,
      status: createdAllocation.status,
    }
  }

  async returnAllocation(id: string) {
    const returnedAllocation = await prisma.allocation.update({
      where: { id },
      data: { status: AllocationStatus.RETURNED },
      select: selectObject,
    })

    return {
      id: returnedAllocation.id,
      equipment: returnedAllocation.equipment,
      employee: returnedAllocation.employee,
      startDate: returnedAllocation.start_date,
      endDate: returnedAllocation.end_date,
      allocatedQuantity: returnedAllocation.allocated_quantity,
      status: returnedAllocation.status,
    }
  }

  async getLatestAllocationByUserId(userId: string) {
    const allocation = await prisma.allocation.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 5,
      select: selectObject,
    })

    if (!allocation.length) return null

    return allocation.map((allocation) => ({
      id: allocation.id,
      equipment: allocation.equipment,
      employee: allocation.employee,
      startDate: allocation.start_date,
      endDate: allocation.end_date,
      allocatedQuantity: allocation.allocated_quantity,
      status: allocation.status,
    }))
  }
}
