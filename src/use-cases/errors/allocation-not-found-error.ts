export class AllocationNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar a alocação')
  }
}
