import express from 'express'
import employeeController from '../controllers/employeeController'
import { stateController } from '../controllers/stateController'

const router = express.Router()

router.get('/get-employees', employeeController.getEmployees)
router.post('/create-employee', employeeController.createEmployee)
router.post('/create-state', stateController.createState)
export default router
