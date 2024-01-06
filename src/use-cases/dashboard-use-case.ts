export class DashboardProducerUseCase {
  constructor(private ruralProducerRepository) {}

  async execute() {
    return {
      amoutFarmTotals: (await this.ruralProducerRepository.getCountFarm())
        .document,
      hectaresFarmTotals: (await this.ruralProducerRepository.getAreaFarm())
        ._sum.areaFarm,
      graphicState: await this.ruralProducerRepository.getCountFarmForState(),
      graphicCulture:
        await this.ruralProducerRepository.getCountFarmForPlantet(),
      graphicGround: {
        areaForPlant: (await this.ruralProducerRepository.getPlantGround())._sum
          .areaForPlant,
        areaForVegetation: (
          await this.ruralProducerRepository.getVegetationGround()
        )._sum.areaForVegetation,
      },
    }
  }
}
