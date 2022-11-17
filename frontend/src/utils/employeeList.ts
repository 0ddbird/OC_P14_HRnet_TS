import { ITableItem } from 'react-ts-table/interfaces'
import { formatDateToString } from './createEmployee'

interface fetchedEmployee {
  employee_id: number
  employee_firstname: string
  employee_lastname: string
  employee_startdate: string
  employee_department: number
  employee_birthdate: string
  employee_street: string
  employee_city: string
  employee_zipcode: string
  employee_state: string
  department_name: string
  state_name: string
}

function formatEmployees (fetchedEmployees: fetchedEmployee[]): ITableItem[] {
  const employees: ITableItem[] = []
  fetchedEmployees.forEach(employee => {
    employees.push({
      id: employee.employee_id.toString(),
      firstName: employee.employee_firstname,
      lastName: employee.employee_lastname,
      startDate: formatDateToString(new Date(employee.employee_startdate)),
      departmentId: employee.employee_department.toString(),
      departmentName: employee.department_name,
      birthDate: formatDateToString(new Date(employee.employee_birthdate)),
      street: employee.employee_street,
      city: employee.employee_city,
      zipCode: employee.employee_zipcode,
      state: employee.state_name,
      stateCode: employee.employee_state
    })
  })

  return employees
}

export { formatEmployees }
