import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import Datepicker from 'react-ts-datepicker'
import Modal from 'react-ts-simple-modal'
import Select from 'react-ts-controlled-select'
import { states } from '../mocks/states'
import { bdOptions, startOptions, defaultDate, formatDateToString } from '../utils/createEmployee'
import { IDateOption } from 'react-ts-datepicker/interfaces'
import { IOption } from 'react-ts-controlled-select/Select'

interface IFormObject {
  [key: string]: string
}

const CreateEmployee = (): JSX.Element => {
  const departments = [{ label: 'Sales', value: '1' }, { label: 'Marketing', value: '2' }, { label: 'Engineering', value: '3' }, { label: 'Human Resources', value: '4' }, { label: 'Legal', value: '5' }]
  const modalPayload = { title: 'Confirmation', content: 'Employee created!' }
  const defaultFormObject = {
    firstname: '',
    lastname: '',
    birthdate: '',
    startdate: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    department: ''
  }
  const today = defaultDate()
  const { employees, setEmployees } = useContext(AppContext)! // eslint-disable-line
  const [formObject, setFormObject] = useState<IFormObject>(defaultFormObject)
  const [selectedBirthdate, setSelectedBirthDate] = useState<IDateOption>(today)
  const [selectedStartDate, setSelectedStartDate] = useState<IDateOption>(today)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [selectedState, setSelectedState] = useState<IOption>(states[0])
  const [selectedDepartment, setSelectedDepartment] = useState<IOption>(departments[0])
  const [birthDatepickerOpen, setBirthDatepickerOpen] = useState(false)
  const [startDatepickerOpen, setStartDatepickerOpen] = useState(false)

  function handleInputChange (e: React.FocusEvent<HTMLInputElement, Element>): void {
    if (e.target.value.length < 1) return
    const updatedFormObject = formObject
    updatedFormObject[`${e.target.id}`] = e.target.value
    setFormObject(updatedFormObject)
  }

  function setLocalFormObject (): void {
    const updatedFormObject = formObject
    updatedFormObject.birthdate = formatDateToString(selectedBirthdate.value)
    updatedFormObject.startdate = formatDateToString(selectedStartDate.value)
    updatedFormObject.state = selectedState.value
    updatedFormObject.department = selectedDepartment.value
    setFormObject(updatedFormObject)
  }

  function handleFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setLocalFormObject()

    if (Object.values(formObject).some(value => value === ' ')) {
      console.error('Missing inputs in form')
    } else {
      fetch('http://localhost:3001/api/v1/create-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      }).then(async res => await res.json())
        .catch(() => console.log('error'))
        .finally(() => setModalDisplayed(true))
    }
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
        <label id='birthdate' >Date of Birth</label>
        <Datepicker
        startYear={bdOptions.startYear}
        stopYear={bdOptions.stopYear}
        defaultYear={bdOptions.defaultYear}
        defaultMonth={bdOptions.defaultMonth}
        setSelectedDate={setSelectedBirthDate}
        selectedDate={selectedBirthdate}
        isExpanded={birthDatepickerOpen}
        setIsExpanded={setBirthDatepickerOpen}
        />
        <label id='startdate'>Start Date</label>
        <Datepicker
        startYear={startOptions.startYear}
        stopYear={startOptions.stopYear}
        defaultYear={startOptions.defaultYear}
        defaultMonth={startOptions.defaultMonth}
        setSelectedDate={setSelectedStartDate}
        selectedDate={selectedStartDate}
        isExpanded={startDatepickerOpen}
        setIsExpanded={setStartDatepickerOpen}
        />
        <fieldset id='create-employee-form-fieldset'>
          <legend>Adress</legend>
          <label htmlFor='street'>Street</label>
          <input id='street' type='text'minLength={2} required onChange={handleInputChange}/>
          <label htmlFor='city'>City</label>
          <input id='city' type='text'minLength={2} required onChange={handleInputChange}></input>
          <label htmlFor='state'>State</label>
          { <Select id='state' options={states} selected={selectedState} setSelected={setSelectedState} /> }
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
    { <Modal title={modalPayload.title} content={modalPayload.content} modalDisplayed={modalDisplayed} setModalDisplayed={setModalDisplayed} /> }
  </>
  )
}

export default CreateEmployee
