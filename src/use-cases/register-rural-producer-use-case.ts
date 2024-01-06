import { PlantetCropsType } from '@prisma/client'
import { ValidateAreaFarmUseCase } from './validate-area-farm-use-case'
import { CheckDocumentExistUseCase } from './check-document-exist-use-case'
import { ValidateDocumentUseCase } from './validate-document-use-case'
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

export class RegisterRuralProducerUseCase {
  constructor(private ruralProducerRepository) {}

  async execute({
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
    const validateDocumentUseCase = new ValidateDocumentUseCase()
    const documentValidate = await validateDocumentUseCase.execute(document)
    console.log('aqui')
    const checkDocumentExistUseCase = new CheckDocumentExistUseCase(
      this.ruralProducerRepository,
    )

    console.log('aqui2 ')

    const documentExist =
      await checkDocumentExistUseCase.execute(documentValidate)

    console.log('aqui3 ')

    if (documentExist) {
      throw new DocumentExistError()
    }

    const validateAreaFarmUseCase = new ValidateAreaFarmUseCase()

    await validateAreaFarmUseCase.execute({
      areaFarm,
      areaForPlant,
      areaForVegetation,
    })

    await this.ruralProducerRepository.create({
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
}
