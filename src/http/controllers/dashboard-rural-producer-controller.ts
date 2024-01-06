import { Request, Response } from 'express'
import { DashboardProducerUseCase } from '../../use-cases/dashboard-use-case'
import { PrismaRuralProducerRepository } from '../../repositories/prisma-rural-producer-repository'

export async function dashboardRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    const ruralProducerRepository = new PrismaRuralProducerRepository()
    const dashboardProducerUseCase = new DashboardProducerUseCase(
      ruralProducerRepository,
    )

    await dashboardProducerUseCase.execute()

    return response.json(await dashboardProducerUseCase.execute())
  } catch (err) {
    return response.status(500).json({})
  }
}
