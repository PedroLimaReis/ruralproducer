import { PrismaRuralProducerRepository } from '../repositories/prisma-rural-producer-repository'
import { ProducerNotExistError } from './errors/producer-not-exist-error'

export async function excludedRuralProducerUseCase(id: string) {
  const prismaRuralProducerRepository = new PrismaRuralProducerRepository()

  const producerExist = await prismaRuralProducerRepository.getProducerById(id)

  if (!producerExist) {
    throw new ProducerNotExistError()
  }

  await prismaRuralProducerRepository.deleteById(id)

  return
}
