import { ITableItem } from 'react-ts-table/interfaces'
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

function formatEmployees (fetchedEmployees: fetchedEmployee[]): ITableItem[] {
  const employees: ITableItem[] = []

  fetchedEmployees.forEach(employee => {
    employees.push({
      id: employee.id.toString(),
      firstName: employee.firstname,
      lastName: employee.lastname,
      startDate: formatDateToString(new Date(employee.startdate)),
      departmentId: employee.department_id.toString(),
      departmentName: employee.department_name,
      birthDate: formatDateToString(new Date(employee.birthdate)),
      street: employee.street,
      city: employee.city,
      state: employee.state,
      stateId: employee.state_id.toString(),
      zipCode: employee.zipcode
    })
  })

  return employees
}

export { formatEmployees }
