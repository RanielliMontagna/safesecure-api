export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super('A categoria que você está tentando criar já existe')
  }
}
