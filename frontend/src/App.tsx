import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { accessors } from './mocks/employees'
import { ITableItem } from 'react-ts-table/interfaces'
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import Home from './pages/Home'
import './sass/main.scss'

interface IAccessor {
  name: string
  value: string
}

interface IAppContext {
  employees: ITableItem[] | undefined
  accessors: IAccessor[]
  setEmployees: React.Dispatch<React.SetStateAction<ITableItem[] | undefined>>
}

export const AppContext = createContext<IAppContext | null>(null)

function App (): JSX.Element {
  const [employees, setEmployees] = useState<ITableItem[] | undefined>(undefined)
  return (
    <div className="App">
    <AppContext.Provider value={{ employees, accessors, setEmployees }}>
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
