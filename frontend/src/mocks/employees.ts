const accessors = [
  {
    name: 'First Name',
    value: 'firstName'
  },
  {
    name: 'Last Name',
    value: 'lastName'
  },
  {
    name: 'Start Date',
    value: 'startDate'
  },
  {
    name: 'Department',
    value: 'departmentName'
  },
  {
    name: 'Birth Date',
    value: 'birthDate'
  },
  {
    name: 'Street',
    value: 'street'
  },
  {
    name: 'City',
    value: 'city'
  },
  {
    name: 'State',
    value: 'state'
  },
  {
    name: 'Zip Code',
    value: 'zipCode'
  }
]

const employeesMock = [
  {
    id: 1,
    firstName: 'Richard',
    lastName: 'Hendricks',
    startDate: '2020-12-01',
    department: 'Engineering',
    birthDate: '1985-05-09',
    street: '12, Baker Street',
    city: 'London',
    state: 'AK',
    zipCode: '123ABC'
  },
  {
    id: 2,
    firstName: 'Obi',
    lastName: 'One',
    startDate: '2019-01-01',
    department: 'Sales',
    birthDate: '1975-06-31',
    street: '02, Baker Street',
    city: 'Paris',
    state: 'NY',
    zipCode: '465ABC'
  },
  {
    id: 3,
    firstName: 'Obi',
    lastName: 'Two',
    startDate: '2010-12-31',
    department: 'Marketing',
    birthDate: '2021-07-24',
    street: '12, space road',
    city: 'Sydney',
    state: 'IO',
    zipCode: 'ABC896'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Connor',
    startDate: '2008-03-15',
    department: 'Legal',
    birthDate: '1990-09-19',
    street: '59, Baker Street',
    city: 'Sydney',
    state: 'IO',
    zipCode: 'ABC896'
  }
]

export { employeesMock, accessors }
