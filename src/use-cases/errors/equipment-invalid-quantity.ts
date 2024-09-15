export class EquipmentInvalidQuantityError extends Error {
  constructor() {
    super(
      'Não é possível diminuir a quantidade para um valor menor que o disponível',
    )
  }
}
