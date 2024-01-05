import { PlantetCropsType } from '@prisma/client'
import { PrismaRuralProducerRepository } from '../repositories/prisma-rural-producer-repository'
import { validateAreaFarmUseCase } from './validate-area-farm-use-case'
import { checkDocumentExistUseCase } from './check-document-exist-use-case'
import { validateDocumentUseCase } from './validate-document-use-case'
import { DocumentExistError } from './errors/document-exist-error'

interface CreateRuralProducerRequest {
  document: string
  nameProducer: string
  nameFarm: string
  city: string
  state: string
  areaFarm: number
  areaForPlant: number
  areaForVegetation: number
  plantetCrops: PlantetCropsType[]
}

export async function registerRuralProducerUseCase({
  document,
  nameProducer,
  nameFarm,
  city,
  state,
  areaFarm,
  areaForPlant,
  areaForVegetation,
  plantetCrops,
}: CreateRuralProducerRequest) {
  const documentValidate = await validateDocumentUseCase(document)

  const documentExist = await checkDocumentExistUseCase(documentValidate)

  if (documentExist) {
    throw new DocumentExistError()
  }

  await validateAreaFarmUseCase({
    areaFarm,
    areaForPlant,
    areaForVegetation,
  })

  const prismaRuralProducerRepository = new PrismaRuralProducerRepository()

  await prismaRuralProducerRepository.create({
    document: documentValidate,
    nameProducer,
    nameFarm,
    city,
    state,
    areaFarm,
    areaForPlant,
    areaForVegetation,
    plantetCrops,
  })

  return
}
