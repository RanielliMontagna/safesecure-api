export class EmployeeAlreadyExistsError extends Error {
  constructor() {
    super('O funcionário que você está tentando criar já existe')
  }
}
