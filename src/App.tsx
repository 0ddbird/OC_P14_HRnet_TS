import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
// Mocks
import { employeesMock, headingsMock } from './mocks/employees'
// Assets
import './sass/main.scss'
import { ITableItems } from 'react-ts-table/interfaces'

interface IAppContext {
  employees: ITableItems
  headings: Array<{
    name: string
    value: string
  }>
  setEmployees: React.Dispatch<React.SetStateAction<ITableItems>>
}

export const AppContext = createContext<IAppContext | null>(null)

function App (): JSX.Element {
  const headings = headingsMock
  const [employees, setEmployees] = useState<ITableItems>(employeesMock)

  return (
    <div className="App">
    <AppContext.Provider value={{ headings, employees, setEmployees }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreateEmployee/>}/>
          <Route path='/employees' element={<EmployeeList/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}

export default App
