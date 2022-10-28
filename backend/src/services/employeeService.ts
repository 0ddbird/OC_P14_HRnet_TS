import { connection } from '../connection/connection'
import { Employee } from '../models/employeeModel'

const employeeService = {

  async getEmployees () {
    const sql = `SELECT
                employees.id,
                employees.firstname,
                employees.lastname,
                employees.birthdate,
                employees.startdate,
                employees.street,
                employees.city,
                employees.zipcode,
                employees.department_id,
                employees.state_id,
                departments.department_name,
                states.state
                FROM ((employees
                INNER JOIN departments
                ON employees.department_id = departments.id)
                INNER JOIN states
                ON employees.state_id = states.id)`
    try {
      const [rows] = await connection.promise().query(sql)
      return rows
    } catch (err) {
      return new Error('Error in employeeService')
    }
  },

  async createEmployee (serviceData: Employee) {
    const sql = `INSERT INTO employees 
                 SET ?`
    const employee = {
      id: null,
      firstname: serviceData.firstname,
      lastname: serviceData.lastname,
      birthdate: serviceData.birthdate,
      startdate: serviceData.startdate,
      department_id: serviceData.department_id,
      street: serviceData.street,
      city: serviceData.city,
      state_id: serviceData.state_id,
      zipcode: serviceData.zipcode
    }
    console.log(employee)
    try {
      const response = await connection.promise().query(sql, employee)
      return response
    } catch (err) {
      return new Error('Error in employeeService')
    }
  }
}

export default employeeService
