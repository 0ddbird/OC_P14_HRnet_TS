import React, { useContext, useReducer, useState } from 'react'
import { AppContext } from '../App'
import Datepicker from 'react-ts-datepicker'
import Modal from 'react-ts-simple-modal'
import Select from 'react-ts-controlled-select'
import { states } from '../mocks/states'
import { bdOptions, startOptions, defaultDate, formatDateToString } from '../utils/createEmployee'
import { IDateOption } from 'react-ts-datepicker/interfaces'
import { IOption } from 'react-ts-controlled-select/Select'
import formReducer, { formActionKind } from '../reducers/formReducer'
import { ITableItem } from 'react-ts-table/interfaces'

const CreateEmployee = (): JSX.Element => {
  const departments = [{ label: 'Sales', value: '1' }, { label: 'Marketing', value: '2' }, { label: 'Engineering', value: '3' }, { label: 'Human Resources', value: '4' }, { label: 'Legal', value: '5' }]
  const modalPayload = { title: 'Confirmation', content: 'Employee created!' }
  const initialFormState = { firstname: '', lastname: '', birthdate: '', startdate: '', street: '', city: '', state: '', zipcode: '', department: '' }
  const today = defaultDate()
  const { employees, setEmployees } = useContext(AppContext)! // eslint-disable-line
  const [formState, dispatch] = useReducer(formReducer, initialFormState)
  const [selectedBirthdate, setSelectedBirthDate] = useState<IDateOption>(today)
  const [selectedStartDate, setSelectedStartDate] = useState<IDateOption>(today)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [selectedState, setSelectedState] = useState<IOption>(states[0])
  const [selectedDepartment, setSelectedDepartment] = useState<IOption>(departments[0])
  const [birthDatepickerOpen, setBirthDatepickerOpen] = useState(false)
  const [startDatepickerOpen, setStartDatepickerOpen] = useState(false)

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      type: formActionKind.ADDTEXT,
      field: e.target.name,
      payload: e.target.value
    })
  }
  function handleFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const fetchPayload = {
      ...formState,
      birthdate: formatDateToString(selectedBirthdate.value),
      startdate: formatDateToString(selectedStartDate.value),
      state: selectedState.value,
      department: selectedDepartment.value
    }

    if (Object.values(fetchPayload).some(value => value === '')) {
      console.error('Some fields are empty')
      return
    }

    // ------- Update App Context to meet project requirements -------
    const newEmployee: ITableItem = {
      id: `${employees !== undefined ? employees.length + 1 : 1}`,
      firstName: formState.firstname,
      lastName: formState.lastname,
      startDate: fetchPayload.startdate,
      birthDate: fetchPayload.birthdate,
      street: fetchPayload.street,
      city: fetchPayload.city,
      zipCode: fetchPayload.zipcode,
      departmentId: selectedDepartment.value,
      departmentName: selectedDepartment.label,
      state: selectedState.label,
      stateCode: selectedState.value
    }
    if (employees === undefined) setEmployees([newEmployee])
    else setEmployees([...employees, newEmployee])

    // POST new employee to API
    fetch('http://localhost:3001/api/v1/create-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchPayload)
    }).then(async res => await res.json())
      .catch(() => console.log('error'))
      .finally(() => {
        setModalDisplayed(true)
        dispatch({
          type: formActionKind.CLEAR,
          payload: '',
          field: ''
        })
      })
  }

  return (
  <>
    <div className='container'>
      <h1>Create Employee</h1>
      <form id='create-employee-form' onSubmit={handleFormSubmit}>

        <label htmlFor='firstname'>First name</label>
        <input id='firstname'
        type='text'
        name='firstname'
        value={formState.firstname}
        required
        minLength={2}
        onChange={handleInputChange}/>

        <label htmlFor='lastname'>Last name</label>
        <input id='lastname'
        type='text'
        name='lastname'
        value={formState.lastname}
        required
        minLength={2}
        onChange={handleInputChange}/>

        <label id='birthdate' >Date of Birth</label>
        <Datepicker
        startYear={bdOptions.startYear}
        stopYear={bdOptions.stopYear}
        defaultYear={bdOptions.defaultYear}
        defaultMonth={bdOptions.defaultMonth}
        setSelectedDate={setSelectedBirthDate}
        selectedDate={selectedBirthdate}
        isExpanded={birthDatepickerOpen}
        setIsExpanded={setBirthDatepickerOpen}/>

        <label id='startdate'>Start Date</label>
        <Datepicker
        startYear={startOptions.startYear}
        stopYear={startOptions.stopYear}
        defaultYear={startOptions.defaultYear}
        defaultMonth={startOptions.defaultMonth}
        setSelectedDate={setSelectedStartDate}
        selectedDate={selectedStartDate}
        isExpanded={startDatepickerOpen}
        setIsExpanded={setStartDatepickerOpen}/>

        <fieldset id='create-employee-form-fieldset'>
          <legend>Adress</legend>

          <label htmlFor='street'>Street</label>
          <input id='street'
          type='text'
          name='street'
          minLength={2}
          value={formState.street}
          required
          onChange={handleInputChange}/>

          <label htmlFor='city'>City</label>
          <input
          id='city'
          type='text'
          minLength={2}
          name='city'
          value={formState.city}
          required
          onChange={handleInputChange}></input>

          <label htmlFor='state'>State</label>
          {
            <Select id='state'
            options={states}
            selected={selectedState}
            setSelected={setSelectedState}/>
          }

          <label htmlFor='zipcode'>Zip Code</label>
          <input
          id='zipcode'
          type='text'
          name='zipcode'
          minLength={2}
          value={formState.zipcode}
          required
          onChange={handleInputChange}/>
        </fieldset>

        <label htmlFor='department'>Department</label>
        {
          <Select
          id='department'
          options={departments}
          selected={selectedDepartment}
          setSelected={setSelectedDepartment}/>
        }
        <div className='submit-button-container'>
          <button className='submit-button' type='submit'>Save</button>
        </div>
      </form>
    </div>
    {
      <Modal
      title={modalPayload.title}
      content={modalPayload.content}
      modalDisplayed={modalDisplayed}
      setModalDisplayed={setModalDisplayed}/>
    }
  </>
  )
}

export default CreateEmployee
