import { IDateOption } from 'react-ts-datepicker/interfaces'

const formDataTemplate = {
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

const formErrorTemplate = {
  firstname: false,
  lastname: false,
  birthdate: false,
  startdate: false,
  street: false,
  city: false,
  state: false,
  zipcode: false,
  department: false
}

const defaultBirthdateOptions = {
  startYear: 1920,
  stopYear: 2022,
  defaultYear: { label: '1980', value: '1980' },
  defaultMonth: { label: 'January', value: '0' }
}

const defaultStartdateOptions = {
  startYear: 1990,
  stopYear: 2022,
  defaultYear: { label: '2022', value: '2022' },
  defaultMonth: { label: 'August', value: '7' }
}

function formatDateToString (date: Date): string {
  const isSingleDigitMonth = date.getMonth().toString().length < 2
  const standardizedMonth = isSingleDigitMonth ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
  const isSingleDigitDate = date.getDate().toString().length < 2
  const standardizedDate = isSingleDigitDate ? `0${date.getDate()}` : `${date.getDate()}`
  return `${date.getFullYear()}-${standardizedMonth}-${standardizedDate}`
}

const defaultDate = (): IDateOption => {
  const date = new Date()
  const dateName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  return {
    label: dateName,
    value: date
  }
}

export { formDataTemplate, formErrorTemplate, defaultBirthdateOptions, defaultStartdateOptions, defaultDate, formatDateToString }
