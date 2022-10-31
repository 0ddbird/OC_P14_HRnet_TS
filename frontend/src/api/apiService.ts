
async function createEmployee (employeeData: any): Promise<any> {
  const fetchPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  }

  const response = await fetch('http://localhost:3001/api/v1/create-employee', fetchPayload)
  const jsonResponse = await response.json()

  console.log('Promise state', jsonResponse)
  return jsonResponse
}

export { createEmployee }
