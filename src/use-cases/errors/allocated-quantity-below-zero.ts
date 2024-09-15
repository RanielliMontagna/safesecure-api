export class AllocatedQuantityBelowZeroError extends Error {
  constructor() {
    super(
      'Você não pode alocar mais equipamentos do que a quantidade disponível',
    )
  }
}
