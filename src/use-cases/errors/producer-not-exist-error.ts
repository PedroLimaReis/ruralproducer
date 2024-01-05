export class ProducerNotExistError extends Error {
  constructor() {
    super('Nenhum produtor rural foi encontrado no sistema')
  }
}
