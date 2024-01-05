export class DocumentInvalidError extends Error {
  constructor() {
    super('Documento informado não é valido')
  }
}
