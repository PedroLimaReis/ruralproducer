import { Request, Response } from 'express'
import { editRuralProducerUseCase } from '../../use-cases/edit-rural-producer-use-case'
import { ProducerNotExistError } from '../../use-cases/errors/producer-not-exist-error'
import { ZodError, z } from 'zod'
import { PlantetCropsType } from '@prisma/client'
import { DocumentExistError } from '../../use-cases/errors/document-exist-error'
import { DocumentInvalidError } from '../../use-cases/errors/doument-invalid-error'
import { InvalidAreaError } from '../../use-cases/errors/invalid-area-error'

export async function editRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    const editBodySchema = z.object({
      document: z.optional(z.string()),
      nameProducer: z.optional(z.string()),
      nameFarm: z.optional(z.string()),
      city: z.optional(z.string()),
      state: z.optional(z.string()),
      areaFarm: z.optional(z.number()),
      areaForPlant: z.optional(z.number()),
      areaForVegetation: z.optional(z.number()),
      plantetCrops: z.optional(z.array(z.nativeEnum(PlantetCropsType))),
    })

    const editParamsSchema = z.object({
      id: z.string(),
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
    } = editBodySchema.parse(request.body)

    const { id } = editParamsSchema.parse(request.params)

    await editRuralProducerUseCase({
      id,
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

    return response.json({ mensage: 'Produtor rural editado com sucesso' })
  } catch (err) {
    if (
      err instanceof ProducerNotExistError ||
      err instanceof ZodError ||
      err instanceof DocumentExistError ||
      err instanceof DocumentInvalidError ||
      err instanceof InvalidAreaError
    ) {
      console.log(err.message)
      return response.status(409).json({ message: err.message })
    }

    console.log(err)

    return response.status(500).json({})
  }
}
