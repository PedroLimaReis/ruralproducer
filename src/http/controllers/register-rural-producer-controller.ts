import { Request, Response } from 'express'
import { RegisterRuralProducerUseCase } from '../../use-cases/register-rural-producer-use-case'
import { ZodError, z } from 'zod'
import { PlantetCropsType } from '@prisma/client'
import { DocumentExistError } from '../../use-cases/errors/document-exist-error'
import { DocumentInvalidError } from '../../use-cases/errors/doument-invalid-error'
import { PrismaRuralProducerRepository } from '../../repositories/prisma-rural-producer-repository'

export async function registerRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    const registerBodySchema = z.object({
      document: z.string(),
      nameProducer: z.string(),
      nameFarm: z.string(),
      city: z.string(),
      state: z.string(),
      areaFarm: z.number(),
      areaForPlant: z.number(),
      areaForVegetation: z.number(),
      plantetCrops: z.array(z.nativeEnum(PlantetCropsType)),
    })

    const {
      document,
      nameProducer,
      nameFarm,
      city,
      state,
      areaFarm,
      areaForPlant,
      areaForVegetation,
      plantetCrops,
    } = registerBodySchema.parse(request.body)

    const prismaRuralProducerRepository = new PrismaRuralProducerRepository()
    const registerRuralProducerUseCase = new RegisterRuralProducerUseCase(
      prismaRuralProducerRepository,
    )

    await registerRuralProducerUseCase.execute({
      document,
      nameProducer,
      nameFarm,
      city,
      state,
      areaFarm,
      areaForPlant,
      areaForVegetation,
      plantetCrops,
    })

    return response.json({ message: 'Produtor rural cadastrado com sucesso' })
  } catch (err) {
    if (
      err instanceof DocumentExistError ||
      err instanceof ZodError ||
      err instanceof DocumentInvalidError
    ) {
      console.log(err.message)
      return response.status(409).json({ message: err.message })
    }

    console.log(err)

    return response.status(500).json({})
  }
}
