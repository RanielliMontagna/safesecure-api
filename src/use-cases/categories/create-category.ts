import { Category } from '@prisma/client'

import { CategoryRepository } from '@/repositories/category-repository'
import { UserRepository } from '@/repositories/user-repository'
import {
  LogAction,
  LogEntities,
  LogRepository,
} from '@/repositories/log-repository'

import { CategoryAlreadyExistsError } from '@/use-cases/errors/category-already-exists'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export interface CreateCategoryUseCaseRequest {
  name: string
  description?: string
  userId: string
}

export interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
  ) {}

  async execute({
    name,
    description,
    userId,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
      userId,
    )

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoryRepository.create({
      name,
      description,
      user_id: userId,
    })

    await this.logRepository.create({
      action: LogAction.CREATE,
      entity: LogEntities.CATEGORIES,
      entity_id: category.id,
      user_id: userId,
      details: `Categoria ${category.name} criada por ${user.name}`,
    })

    return { category }
  }
}
