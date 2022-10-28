import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { headingsMock } from './mocks/employees'
import { ITableItems } from 'react-ts-table/interfaces'
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import Home from './pages/Home'
import { formatEmployees } from './utils/employeeList'
import './sass/main.scss'

interface IHeading {
  name: string
  value: string
}

interface IAppContext {
  employees: ITableItems | undefined
  headings: IHeading[]
  setEmployees: React.Dispatch<React.SetStateAction<ITableItems | undefined>>
}

export const AppContext = createContext<IAppContext | null>(null)

function App (): JSX.Element {
  const headings = headingsMock
  const [employees, setEmployees] = useState<ITableItems | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const controller = new AbortController()
    const signal = controller.signal
    const fetchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal
    }
    fetch('http://localhost:3001/api/v1/get-employees', fetchParams)
      .then(async res => res.ok ? await res.json() : await Promise.reject(new Error('Request failed')))
      .then(fetchedEmployees => setEmployees(formatEmployees(fetchedEmployees.body)))
      .catch(() => signal.aborted ? console.log('Request aborted') : console.error('Request failed'))
      .finally(() => setIsLoading(false))
    console.log(isLoading)
    return () => controller.abort()
  }, [])
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
