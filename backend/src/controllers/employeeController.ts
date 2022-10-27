import { Request, Response } from 'express'
import employeeService from '../services/employeeService'

interface IResponse {
  status?: number
  message?: string
  body?: any
}

const employeeController = {
  async getEmployees (req: Request, res: Response) {
    const response: IResponse = {}

    try {
      const serviceResponse = await employeeService.getEmployees()
      response.status = 200
      response.message = 'Successfully got employees'
      response.body = serviceResponse
    } catch (error: any) {
      console.error('Error in employeeController', error)
      response.status = 400
      response.message = error.message
    }
    return res.status(response.status).send(response)
  },
  async createEmployee (req: Request, res: Response) {
    const response: IResponse = {}
    const serviceResponse = await employeeService.createEmployee(req.body)

    try {
      response.status = 200
      response.message = 'Successfully created employee'
      response.body = serviceResponse
    } catch (error: any) {
      console.error('Error in employeeController', error)
      response.status = 400
      response.message = error.message
    }
    return res.status(response.status).send(response)
  }
}

export default employeeController
