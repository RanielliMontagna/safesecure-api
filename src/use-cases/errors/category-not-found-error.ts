export class CategoryNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar a categoria')
  }
}
