import React, { useContext } from 'react'
import { AppContext } from '../App'
import Table from 'react-ts-table'

const EmployeeList = (): JSX.Element => {
  const { employees, headings } = useContext(AppContext)! // eslint-disable-line

  const tableOptions = {
    searchModule: true,
    paginationModule: true,
    countModule: true,
    navigationModule: true,
    paginationOptions: [
      {
        label: '10',
        value: '10'
      },
      {
        label: '25',
        value: '25'
      },
      {
        label: '50',
        value: '50'
      },
      {
        label: '100',
        value: '100'
      }
    ]
  }

  return (
  <>
    <h1>Current Employees</h1>
    {(employees != null) && <Table content={{ headers: headings, items: employees }} options={tableOptions}/>}
  </>
  )
}

export default EmployeeList
