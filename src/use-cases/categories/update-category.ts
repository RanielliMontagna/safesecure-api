import { type CategoryRepository } from '@/repositories/category-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'

import type {
  CreateCategoryUseCaseRequest,
  CreateCategoryUseCaseResponse,
} from './create-category'

import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { UserRepository } from '@/repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface UpdateCategoryCaseRequest
  extends Partial<CreateCategoryUseCaseRequest> {
  categoryId: string
  userId: string
}

interface UpdateCategoryCaseResponse extends CreateCategoryUseCaseResponse {}

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    name,
    description,
    userId,
    categoryId,
  }: UpdateCategoryCaseRequest): Promise<UpdateCategoryCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const category = await this.categoryRepository.findById(categoryId)
    if (!category) throw new CategoryNotFoundError()

    const updatedCategory = await this.categoryRepository.update({
      id: categoryId,
      name: name,
      description: description,
      user_id: userId,
    })

    await this.logRepository.create({
      action: LogAction.UPDATE,
      details: `Categoria ${category.name} atualizada por ${user.name}`,
      entity: LogEntities.CATEGORIES,
      entity_id: categoryId,
      user_id: userId,
    })

    return { category: updatedCategory }
  }
}
