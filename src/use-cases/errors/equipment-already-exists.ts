export class EquipmentAlreadyExistsError extends Error {
  constructor() {
    super('O equipamento que você está tentando criar já existe')
  }
}
