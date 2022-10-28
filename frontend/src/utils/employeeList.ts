import { ITableItems } from 'react-ts-table/interfaces'
import { formatDateToString } from './createEmployee'

interface fetchedEmployee {
  id: number
  firstname: string
  lastname: string
  startdate: string
  department_name: string
  birthdate: string
  street: string
  city: string
  state: string
  zipcode: string
  department_id: number
  state_id: number
}

function formatEmployees (fetchedEmployees: fetchedEmployee[]): ITableItems {
  const employeesMap = new Map()

  fetchedEmployees.forEach(employee => {
    const formatedData = {
      firstname: employee.firstname,
      lastname: employee.lastname,
      startDate: formatDateToString(new Date(employee.startdate)),
      department: employee.department_name,
      birthDate: formatDateToString(new Date(employee.birthdate)),
      street: employee.street,
      city: employee.city,
      state: employee.state,
      zipCode: employee.zipcode
    }
    employeesMap.set(`${employee.id - 1}`, formatedData)
  })

  return employeesMap
}

export { formatEmployees }
