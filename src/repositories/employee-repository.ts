import type { Employee, Prisma } from '@prisma/client'
import { Options } from '@/use-cases/options/options'

export interface FindManyByUserIdOptions extends Pick<Options, 'search'> {}

export interface EmployeeRepository {
  findById(id: string): Promise<Employee | null>
  findByCpfOrRegistration(
    cpf: string,
    registration: number,
  ): Promise<Employee | null>
  findManyByUserId(
    userId: string,
    options?: FindManyByUserIdOptions,
  ): Promise<Employee[]>
  create(employee: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
  update(employee: Prisma.EmployeeUncheckedUpdateInput): Promise<Employee>
  delete(id: string): Promise<void>
}
