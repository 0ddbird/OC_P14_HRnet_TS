import React, { useContext } from 'react'
import { AppContext } from '../App'
import Table, { ITableOptions } from '../components/table/Table'

const EmployeeList = (): JSX.Element => {
  const { employees, headings } = useContext(AppContext)! // eslint-disable-line

  const tableOptions: ITableOptions = {
    searchModule: true,
    paginationModule: true,
    countModule: true,
    navigationModule: true
  }

  return (
  <>
    <h1>Current Employees</h1>
    {(employees != null) && <Table headings={headings} items={employees} options={tableOptions}/>}
  </>
  )
}

export default EmployeeList
