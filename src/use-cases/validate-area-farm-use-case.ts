import { InvalidAreaError } from './errors/invalid-area-error'

interface ValidateAreaFarmRequest {
  areaFarm: number
  areaForPlant: number
  areaForVegetation: number
}

export class ValidateAreaFarmUseCase {
  async execute({
    areaFarm,
    areaForPlant,
    areaForVegetation,
  }: ValidateAreaFarmRequest) {
    const areaPlantAndVegetation = areaForPlant + areaForVegetation

    if (areaFarm < areaPlantAndVegetation) {
      throw new InvalidAreaError()
    }

    return
  }
}
