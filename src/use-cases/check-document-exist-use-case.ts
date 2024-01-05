export class CheckDocumentExistUseCase {
  constructor(private ruralProducerRepository) {}

  async execute(document: string) {
    const documentExist =
      await this.ruralProducerRepository.getDocument(document)

    if (documentExist === 0) {
      return false
    }

    return true
  }
}
