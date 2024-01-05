import { PlantetCropsType } from '@prisma/client'
import { PrismaRuralProducerRepository } from '../repositories/prisma-rural-producer-repository'
import { validateAreaFarmUseCase } from './validate-area-farm-use-case'
import { checkDocumentExistUseCase } from './check-document-exist-use-case'
import { validateDocumentUseCase } from './validate-document-use-case'
import { ProducerNotExistError } from './errors/producer-not-exist-error'
import { DocumentExistError } from './errors/document-exist-error'

interface EditRuralProducerRequest {
  id: string
  document?: string
  nameProducer?: string
  nameFarm?: string
  city?: string
  state?: string
  areaFarm?: number
  areaForPlant?: number
  areaForVegetation?: number
  plantetCrops?: PlantetCropsType[]
}

export async function editRuralProducerUseCase(data: EditRuralProducerRequest) {
  const prismaRuralProducerRepository = new PrismaRuralProducerRepository()

  const ruralProducer = await prismaRuralProducerRepository.getProducerById(
    data.id,
  )

  if (!ruralProducer) {
    throw new ProducerNotExistError()
  }

  const editProducer = {
    document: data.document ? data.document : ruralProducer.document,
    nameProducer: data.nameProducer
      ? data.nameProducer
      : ruralProducer.nameProducer,
    nameFarm: data.nameFarm ? data.nameFarm : ruralProducer.nameFarm,
    city: data.city ? data.city : ruralProducer.city,
    state: data.state ? data.state : ruralProducer.state,
    areaFarm: data.areaFarm ? data.areaFarm : ruralProducer.areaFarm,
    areaForPlant: data.areaForPlant
      ? data.areaForPlant
      : ruralProducer.areaForPlant,
    areaForVegetation: data.areaForVegetation
      ? data.areaForVegetation
      : ruralProducer.areaForVegetation,
    plantetCrops: data.plantetCrops
      ? data.plantetCrops
      : ruralProducer.plantetCrops,
  }

  if (data.document) {
    const documentValidate = await validateDocumentUseCase(data.document)

    const documentExist = await checkDocumentExistUseCase(documentValidate)

    if (documentExist && documentValidate !== ruralProducer.document) {
      throw new DocumentExistError()
    }
  }

  await validateAreaFarmUseCase({
    areaFarm: editProducer.areaFarm,
    areaForPlant: editProducer.areaForPlant,
    areaForVegetation: editProducer.areaForVegetation,
  })

  await prismaRuralProducerRepository.updateById(editProducer, data.id)

  return
}
