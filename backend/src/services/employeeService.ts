import { connection } from '../connection/connection'
import { Employee } from '../models/employeeModel'

const employeeService = {

  async getEmployees () {
    const sql = `
    SELECT
    employees.employee_id,
    employees.employee_firstname,
    employees.employee_lastname,
    employees.employee_birthdate,
    employees.employee_startdate,
    employees.employee_street,
    employees.employee_city,
    employees.employee_zipcode,
    employees.employee_department,
    employees.employee_state,
    departments.department_name,
    states.state_name
    FROM
    (
        (
            employees
        INNER JOIN departments ON employees.employee_department = departments.department_id
        )
    INNER JOIN states ON employees.employee_state = states.state_code
    )`
    try {
      const [rows] = await connection.promise().query(sql)
      return rows
    } catch (err) {
      return new Error('Error in employeeService')
    }
  },

  async createEmployee (serviceData: Employee) {
    console.log(serviceData)
    const sql = `INSERT INTO employees 
                 SET ?`
    const employee = {
      employee_id: null,
      employee_firstname: serviceData.firstname,
      employee_lastname: serviceData.lastname,
      employee_birthdate: serviceData.birthdate,
      employee_startdate: serviceData.startdate,
      employee_department: serviceData.department,
      employee_street: serviceData.street,
      employee_city: serviceData.city,
      employee_state: serviceData.state,
      employee_zipcode: serviceData.zipcode
    }
    const hasEmptyValues = Object.values(serviceData).some(value => value === '')
    if (hasEmptyValues) throw new Error('missing values')
    console.log(employee)
    try {
      const response = await connection.promise().query(sql, employee)
      console.log('employee created in DB')
      return response
    } catch (err) {
      throw new Error('Error in employeeService')
    }
  }
}

export default employeeService
