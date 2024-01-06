import { Request, Response } from 'express'
import { ExcludedRuralProducerUseCase } from '../../use-cases/excluded-rural-producer-use-case'
import { ProducerNotExistError } from '../../use-cases/errors/producer-not-exist-error'
import { ZodError, z } from 'zod'
import { PrismaRuralProducerRepository } from '../../repositories/prisma-rural-producer-repository'

export async function excludRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    const registerParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = registerParamsSchema.parse(request.params)
    const prismaRuralProducerRepository = new PrismaRuralProducerRepository()
    const excludedRuralProducerUseCase = new ExcludedRuralProducerUseCase(
      prismaRuralProducerRepository,
    )

    await excludedRuralProducerUseCase.execute(id)

    return response.json()
  } catch (err) {
    if (err instanceof ProducerNotExistError || err instanceof ZodError) {
      console.log(err.message)
      return response.status(409).json({ message: err.message })
    }

    return response.status(500).json({})
  }
}
