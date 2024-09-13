export class EmployeeNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar o funcionário')
  }
}
