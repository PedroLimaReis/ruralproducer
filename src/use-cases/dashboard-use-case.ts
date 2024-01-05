import { PrismaRuralProducerRepository } from '../repositories/prisma-rural-producer-repository'

export async function dashboardProducerUseCase() {
  const prismaRuralProducerRepository = new PrismaRuralProducerRepository()

  return {
    amoutFarmTotals: (await prismaRuralProducerRepository.getCountFarm())
      .document,
    hectaresFarmTotals: (await prismaRuralProducerRepository.getAreaFarm())._sum
      .areaFarm,
    graphicState: await prismaRuralProducerRepository.getCountFarmForState(),
    graphicCulture:
      await prismaRuralProducerRepository.getCountFarmForPlantet(),
    graphicGround: {
      areaForPlant: (await prismaRuralProducerRepository.getPlantGround())._sum
        .areaForPlant,
      areaForVegetation: (
        await prismaRuralProducerRepository.getVegetationGround()
      )._sum.areaForVegetation,
    },
  }
}
