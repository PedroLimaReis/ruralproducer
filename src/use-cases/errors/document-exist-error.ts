export class DocumentExistError extends Error {
  constructor() {
    super('Documento ja cadastrado')
  }
}
