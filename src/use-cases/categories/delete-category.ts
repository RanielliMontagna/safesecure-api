import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

import { CategoryRepository } from '@/repositories/category-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'
import { UserRepository } from '@/repositories/user-repository'

interface DeleteCategoryUseCaseRequest {
  categoryId: string
  userId: string
}

export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    categoryId,
    userId,
  }: DeleteCategoryUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const category = await this.categoryRepository.findById(categoryId)
    if (!category) throw new CategoryNotFoundError()

    await this.categoryRepository.delete(categoryId)

    await this.logRepository.create({
      action: LogAction.DELETE,
      details: `Categoria ${category.name} deletada por ${user.name}`,
      entity: LogEntities.CATEGORIES,
      entity_id: categoryId,
      user_id: userId,
    })
  }
}
