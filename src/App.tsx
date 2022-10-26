import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import { ITableHeading, ITableItem } from './components/table/Table'
// Mocks
import { employeesMock, headingsMock } from './mocks/employees'
// Assets
import './sass/main.scss'

interface IAppContext {
  employees: ITableItem[]
  headings: ITableHeading[]
  setEmployees: React.Dispatch<React.SetStateAction<ITableItem[]>>
}

export const AppContext = createContext<IAppContext | null>(null)

function App (): JSX.Element {
  const headings = headingsMock
  const [employees, setEmployees] = useState<ITableItem[]>(employeesMock)

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
