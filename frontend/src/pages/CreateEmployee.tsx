import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
// Components
import Datepicker from 'react-ts-datepicker'
import Modal from 'react-ts-simple-modal'
import Select from 'react-ts-controlled-select'
// Mocks
import { states } from '../mocks/states'
// Utils
import { formDataTemplate, bdOptions, startOptions, defaultDate, formatDateToString } from '../utils/createEmployee'
import { IDateOption } from 'react-ts-datepicker/interfaces'
import { IOption } from 'react-ts-controlled-select/Select'

interface IFormData {
  [key: string]: string
}

const CreateEmployee = (): JSX.Element => {
  const departments = [{ label: 'Sales', value: 'sales' }, { label: 'Marketing', value: 'marketing' }, { label: 'Engineering', value: 'engineering' }, { label: 'Human Resources', value: 'hr' }, { label: 'Legal', value: 'legal' }]
  const modalPayload = { title: 'Confirmation', content: 'Employee created!' }
  const { employees, setEmployees } = useContext(AppContext)! // eslint-disable-line
  const [selectedBirthdate, setSelectedBirthDate] = useState<IDateOption>(defaultDate())
  const [selectedStartDate, setSelectedStartDate] = useState<IDateOption>(defaultDate())
  const [formData, setFormData] = useState<IFormData>(formDataTemplate)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [selectedState, setSelectedState] = useState<IOption>(states[0])
  const [selectedDepartment, setSelectedDepartment] = useState<IOption>(departments[0])
  const [isDPBirthdateExpanded, setIsDPBirthdateExpanded] = useState(false)
  const [isDPStartdateExpanded, setIsDPStartdateExpanded] = useState(false)
  function handleInputChange (e: React.FocusEvent<HTMLInputElement, Element>): void {
    if (e.target.value.length < 1) return
    const newFormData = { ...formData }
    newFormData[`${e.target.id}`] = e.target.value
    setFormData(newFormData)
  }

  function setLocalFormObject (): void {
    const newFormData = { ...formData }
    newFormData.birthdate = formatDateToString(selectedBirthdate.value)
    newFormData.startdate = formatDateToString(selectedStartDate.value)
    newFormData.state = selectedState.value
    newFormData.department = selectedDepartment.value
    setFormData(newFormData)
  }

  function handleFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setLocalFormObject()
    setModalDisplayed(true)
    // ------------------- A remplacer par requête POST ------------------- //
    // Pas de GET des employés après le POST pour respecter la consigne du projet
    const currentEmployees = new Map(employees)
    currentEmployees.set(`${currentEmployees.size}`, formData)
    setEmployees(currentEmployees)
    // ------------------------------------------------------------------- //
  }

  return (
  <>
    <div className='container'>
      <h1>Create Employee</h1>
      <form id='create-employee-form' onSubmit={handleFormSubmit}>
        <label htmlFor='firstname'>First name</label>
        <input id='firstname' type='text' required minLength={2} onChange={handleInputChange}/>
        <label htmlFor='lastname'>Last name</label>
        <input id='lastname' type='text' required minLength={2} onChange={handleInputChange}/>
        <label id='birthdate'>Date of Birth</label>
        <Datepicker
        startYear={bdOptions.startYear}
        stopYear={bdOptions.stopYear}
        defaultYear={bdOptions.defaultYear}
        defaultMonth={bdOptions.defaultMonth}
        setSelectedDate={setSelectedBirthDate}
        selectedDate={selectedBirthdate}
        isExpanded={isDPBirthdateExpanded}
        setIsExpanded={setIsDPBirthdateExpanded}/>
        <label id='startdate'>Start Date</label>
        <Datepicker
        startYear={startOptions.startYear}
        stopYear={startOptions.stopYear}
        defaultYear={startOptions.defaultYear}
        defaultMonth={startOptions.defaultMonth}
        setSelectedDate={setSelectedStartDate}
        selectedDate={selectedStartDate}
        isExpanded={isDPStartdateExpanded}
        setIsExpanded={setIsDPStartdateExpanded}
        />
        <fieldset id='create-employee-form-fieldset'>
          <legend>Adress</legend>
          <label htmlFor='street'>Street</label>
          <input id='street' type='text'minLength={2} required onChange={handleInputChange}/>
          <label htmlFor='city'>City</label>
          <input id='city' type='text'minLength={2} required onChange={handleInputChange}></input>
          <label htmlFor='state'>State</label>
          {<Select id='state' options={states} selected={selectedState} setSelected={setSelectedState} />}
          <label htmlFor='zipcode'>Zip Code</label>
          <input id='zipcode' type='text' minLength={2} required onChange={handleInputChange}/>
        </fieldset>
        <label htmlFor='department'>Department</label>
        { <Select id='department' options={departments} selected={selectedDepartment} setSelected={setSelectedDepartment} /> }
        <div className='submit-button-container'>
          <button className='submit-button' type='submit'>Save</button>
        </div>
      </form>
    </div>
    {<Modal title={modalPayload.title} content={modalPayload.content} modalDisplayed={modalDisplayed} setModalDisplayed={setModalDisplayed} /> }
  </>
  )
}

export default CreateEmployee
