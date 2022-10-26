import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
// Components
import DatePicker, { IDatePickerOption } from '../components/datepicker/DatePicker'
import Modal from '../components/Modal'
import Select from 'react-controlled-select'
import Uploader from '../components/jsonUploader/Uploader'
// Mocks
import { states } from '../mocks/states'
// Utils
import { formDataTemplate, formErrorTemplate, defaultBirthdateOptions, defaultStartdateOptions, defaultDate, formatDateToString } from '../utils/createEmployee'
import { IOption } from '../components/Select'
import { ITableItem } from '../components/table/Table'

const CreateEmployee = (): JSX.Element => {
  const departments = [
    {
      name: 'Sales',
      value: 'sales'
    },
    {
      name: 'Marketing',
      value: 'marketing'
    },
    {
      name: 'Engineering',
      value: 'engineering'
    },
    {
      name: 'Human Resources',
      value: 'hr'
    },
    {
      name: 'Legal',
      value: 'legal'
    }
  ]

  const { employees, setEmployees } = useContext(AppContext)! // eslint-disable-line
  const [selectedBirthdate, setSelectedBirthDate] = useState<IDatePickerOption>(defaultDate())
  const [selectedStartDate, setSelectedStartDate] = useState<IDatePickerOption>(defaultDate())
  const [formData, setFormData] = useState(formDataTemplate)
  const [formErrors, setFormErrors] = useState(formErrorTemplate)
  const [file, setFile] = useState(undefined)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const [selectedState, setSelectedState] = useState<IOption>(states[0])
  const [selectedDepartment, setSelectedDepartment] = useState<IOption>(departments[0])
  const modalPayload = { title: 'Confirmation', content: 'Employee created!' }

  function handleInputChange (e: React.FocusEvent<HTMLInputElement, Element>): void {
    if (e.target.value.length > 1) {
      const newFormData = formData
      newFormData[`${e.target.id}`] = e.target.value
      setFormData(newFormData)
    } else {
      const newFormErrors = formErrors
      newFormErrors[`${e.target.id}`] = true
      setFormErrors(newFormErrors)
    }
  }

  function setLocalFormObject (): void {
    const newFormData = formData
    newFormData.birthdate = selectedBirthdate
    newFormData.startdate = selectedStartDate
    newFormData.state = selectedState
    newFormData.department = selectedDepartment
    setFormData(newFormData)
  }

  function handleFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setLocalFormObject()
    setModalDisplayed(true)
    const currentEmployees = [...employees]
    currentEmployees.push(formatEmployee(formData))
    setEmployees(currentEmployees)
  }

  function formatEmployee (employeeData): ITableItem {
    return {
      firstName: employeeData.firstname,
      lastName: employeeData.lastname,
      startDate: formatDateToString(employeeData.startdate.value),
      department: employeeData.department.name,
      birthDate: formatDateToString(employeeData.birthdate.value),
      street: employeeData.street,
      city: employeeData.city,
      state: employeeData.state.value,
      zipCode: employeeData.zipcode
    }
  }

  function importEmployees (file): void {
    const currentEmployees = [...employees]
    file.forEach(employee => { currentEmployees.push(employee) })
    setEmployees(currentEmployees)
  }

  useEffect(() => {
    if (file != null) importEmployees(file)
  }, [file])

  return (
  <>
    <div className='container'>
      <h1>Create Employee</h1>
      <form id='create-employee-form' onSubmit={(e) => handleFormSubmit(e)}>
        <label htmlFor='firstname'>First name</label>
        <input id='firstname' type='text' required minLength={2} onBlur={(e) => handleInputChange(e)}/>

        <label htmlFor='lastname'>Last name</label>
        <input id='lastname' type='text' required minLength={2} onBlur={(e) => handleInputChange(e)}/>

        <label id='birthdate'>Date of Birth</label>
        {<DatePicker
        startYear={defaultBirthdateOptions.startYear}
        stopYear={defaultBirthdateOptions.stopYear}
        defaultYear={defaultBirthdateOptions.defaultYear}
        defaultMonth={defaultBirthdateOptions.defaultMonth}
        setSelectedDate={setSelectedBirthDate}
        selectedDate={selectedBirthdate}
        />}

        <label id='startdate'>Start Date</label>
        {<DatePicker
        startYear={defaultStartdateOptions.startYear}
        stopYear={defaultStartdateOptions.stopYear}
        defaultYear={defaultStartdateOptions.defaultYear}
        defaultMonth={defaultStartdateOptions.defaultMonth}
        setSelectedDate={setSelectedStartDate}
        selectedDate={selectedStartDate}
        />}

        <fieldset id='create-employee-form-fieldset'>
          <legend>Adress</legend>

          <label htmlFor='street'>Street</label>
          <input id='street' type='text'minLength={2} required onBlur={(e) => handleInputChange(e)}/>

          <label htmlFor='city'>City</label>
          <input id='city' type='text'minLength={2} required onBlur={(e) => handleInputChange(e)}></input>

          <label htmlFor='state'>State</label>
          {<Select
          id='state'
          options={states}
          selected={selectedState}
          setSelected={setSelectedState}
          />}

          <label htmlFor='zipcode'>Zip Code</label>
          <input id='zipcode' type='text' minLength={2} required onBlur={(e) => handleInputChange(e)}/>
        </fieldset>

        <label htmlFor='department'>Department</label>
        {<Select
        options={departments}
        selected={selectedDepartment}
        setSelected={setSelectedDepartment}
        />}

        <div className='submit-button-container'>
          <button className='submit-button' type='submit'>Save</button>
        </div>

      </form>
      {
      <Uploader setFile={setFile}/>
      }
    </div>

    {<Modal
    title={modalPayload.title}
    content={modalPayload.content}
    modalDisplayed={modalDisplayed}
    setModalDisplayed={setModalDisplayed}
    />}
  </>
  )
}

export default CreateEmployee
