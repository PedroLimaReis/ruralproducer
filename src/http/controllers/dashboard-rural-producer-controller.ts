import { Request, Response } from 'express'
import { dashboardProducerUseCase } from '../../use-cases/dashboard-use-case'

export async function dashboardRuralProducerController(
  request: Request,
  response: Response,
) {
  try {
    await dashboardProducerUseCase()

    return response.json(await dashboardProducerUseCase())
  } catch (err) {
    return response.status(500).json({})
  }
}
