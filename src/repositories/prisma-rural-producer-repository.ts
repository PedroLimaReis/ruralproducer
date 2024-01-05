import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class PrismaRuralProducerRepository {
  async create(data: Prisma.RuralProducerCreateInput) {
    const ruralProducer = await prisma.ruralProducer.create({
      data,
    })

    return ruralProducer
  }

  async updateById(data: Prisma.RuralProducerUpdateInput, id: string) {
    await prisma.ruralProducer.update({
      data,
      where: {
        id,
      },
    })

    return
  }

  async deleteById(id: string) {
    await prisma.ruralProducer.delete({ where: { id } })

    return
  }

  async getAllProducer() {
    return await prisma.ruralProducer.findMany()
  }

  async getProducerById(id: string) {
    return await prisma.ruralProducer.findFirst({
      where: { id },
    })
  }

  async getDocument(cpfOrCnpj: string) {
    return await prisma.ruralProducer.count({
      where: { document: cpfOrCnpj },
    })
  }

  async getCountFarm() {
    return await prisma.ruralProducer.count({
      select: {
        document: true,
      },
    })
  }

  async getAreaFarm() {
    return await prisma.ruralProducer.aggregate({
      _sum: {
        areaFarm: true,
      },
    })
  }

  async getCountFarmForState() {
    return await prisma.ruralProducer.groupBy({
      by: ['state'],
      _sum: {
        areaFarm: true,
      },
    })
  }

  async getCountFarmForPlantet() {
    return await prisma.ruralProducer.groupBy({
      by: ['plantetCrops'],
      _count: {
        document: true,
      },
    })
  }

  async getPlantGround() {
    return await prisma.ruralProducer.aggregate({
      _sum: {
        areaForPlant: true,
      },
    })
  }

  async getVegetationGround() {
    return await prisma.ruralProducer.aggregate({
      _sum: {
        areaForVegetation: true,
      },
    })
  }
}
