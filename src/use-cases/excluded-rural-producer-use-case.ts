import { ProducerNotExistError } from './errors/producer-not-exist-error'

export class ExcludedRuralProducerUseCase {
  constructor(private ruralProducerRepository) {}

  async execute(id: string) {
    const producerExist = await this.ruralProducerRepository.getProducerById(id)

    if (!producerExist) {
      throw new ProducerNotExistError()
    }

    await this.ruralProducerRepository.deleteById(id)

    return
  }
}
