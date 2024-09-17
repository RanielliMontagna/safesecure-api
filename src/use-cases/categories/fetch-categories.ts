import { Category } from '@prisma/client'

import {
  CategoryRepository,
  FindManyByUserIdOptions,
} from '@/repositories/category-repository'
import { UserRepository } from '@/repositories/user-repository'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface FetchCategoriesUseCaseRequest {
  userId: string
  options?: Pick<FindManyByUserIdOptions, 'search'>
}

interface FetchCategoriesUseCaseResponse {
  categories: {
    id: Category['id']
    name: Category['name']
    description: Category['description']
  }[]
}

export class FetchCategoriesUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    options,
  }: FetchCategoriesUseCaseRequest): Promise<FetchCategoriesUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const categories = await this.categoryRepository.findManyByUserId(
      userId,
      options,
    )

    return {
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
      })),
    }
  }
}
