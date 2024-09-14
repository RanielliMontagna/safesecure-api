export class EquipmentNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar o equipamento solicitado.')
  }
}
