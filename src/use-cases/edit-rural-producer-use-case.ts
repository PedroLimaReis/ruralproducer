import { PlantetCropsType } from '@prisma/client'
import { ValidateAreaFarmUseCase } from './validate-area-farm-use-case'
import { CheckDocumentExistUseCase } from './check-document-exist-use-case'
import { ValidateDocumentUseCase } from './validate-document-use-case'
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

export class EditRuralProducerUseCase {
  constructor(private ruralProducerRepository) {}

  async execute(data: EditRuralProducerRequest) {
    const ruralProducer = await this.ruralProducerRepository.getProducerById(
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
      const validateDocumentUseCase = new ValidateDocumentUseCase()
      const documentValidate = await validateDocumentUseCase.execute(
        data.document,
      )
      const checkDocumentExistUseCase = new CheckDocumentExistUseCase(
        this.ruralProducerRepository,
      )

      const documentExist =
        await checkDocumentExistUseCase.execute(documentValidate)

      if (documentExist && documentValidate !== ruralProducer.document) {
        throw new DocumentExistError()
      }
    }

    const validateAreaFarmUseCase = new ValidateAreaFarmUseCase()

    await validateAreaFarmUseCase.execute({
      areaFarm: editProducer.areaFarm,
      areaForPlant: editProducer.areaForPlant,
      areaForVegetation: editProducer.areaForVegetation,
    })

    await this.ruralProducerRepository.updateById(editProducer, data.id)

    return
  }
}
