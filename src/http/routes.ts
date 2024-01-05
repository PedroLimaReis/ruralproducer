import express from 'express'
import { registerRuralProducerController } from './controllers/register-rural-producer-controller'
import { dashboardRuralProducerController } from './controllers/dashboard-rural-producer-controller'
import { editRuralProducerController } from './controllers/edit-rural-producer-controller'
import { getRuralProducerController } from './controllers/get-rural-producer-controller'
import { excludRuralProducerController } from './controllers/exclud-rural-producer-controller'

const router = express.Router()

router.get('/', getRuralProducerController)
router.get('/dashboard', dashboardRuralProducerController)
router.post('/', registerRuralProducerController)
router.put('/:id', editRuralProducerController)
router.delete('/:id', excludRuralProducerController)

export default router
