import { Request, Response } from 'express'
import { ProducerNotExistError } from '../../use-cases/errors/producer-not-exist-error'
import { PrismaRuralProducerRepository } from '../../repositories/prisma-rural-producer-repository'

export async function getRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    const prismaRuralProducerRepository = new PrismaRuralProducerRepository()

    const allProducer = await prismaRuralProducerRepository.getAllProducer()
    return response.json(allProducer)
  } catch (err) {
    if (err instanceof ProducerNotExistError) {
      console.log(err.message)
      return response.status(409).json({ message: err.message })
    }

    return response.status(500).json({})
  }
}
