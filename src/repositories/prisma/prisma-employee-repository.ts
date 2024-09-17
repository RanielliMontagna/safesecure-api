import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import {
  EmployeeRepository,
  FindManyByUserIdOptions,
} from '../employee-repository'

export class PrismaEmployeeRepository implements EmployeeRepository {
  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) return null
    if (employee.deleted_at) return null

    return employee
  }

  async findByCpfOrRegistration(cpf: string, registration: number) {
    const employee = await prisma.employee.findFirst({
      where: { cpf, registration },
    })

    if (!employee) return null
    if (employee.deleted_at) return null

    return employee
  }

  async findManyByUserId(userId: string, options: FindManyByUserIdOptions) {
    const orArray: Prisma.EmployeeWhereInput[] = [
      { name: { contains: options?.search, mode: 'insensitive' } },
      { cpf: { contains: options?.search, mode: 'insensitive' } },
      { registration: { equals: Number(options?.search?.replace(/\D/g, '')) } },
    ]

    const employees = await prisma.employee.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
        OR: options?.search ? orArray : undefined,
      },
    })

    return employees
  }

  async create(employee: Prisma.EmployeeUncheckedCreateInput) {
    const createdEmployee = await prisma.employee.create({
      data: employee,
    })

    return createdEmployee
  }

  async update(employee: Prisma.EmployeeUncheckedUpdateInput) {
    const updatedEmployee = await prisma.employee.update({
      where: { id: employee.id as string },
      data: employee,
    })

    return updatedEmployee
  }

  async delete(id: string) {
    await prisma.employee.update({
      where: { id },
      data: { deleted_at: new Date() },
    })
  }
}
