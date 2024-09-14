export class AllocatedQuantityExceedsAvailableError extends Error {
  constructor() {
    super('A quantidade alocada é maior que a quantidade disponível')
  }
}
