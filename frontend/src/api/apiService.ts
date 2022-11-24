async function createEmployee (employeeData: any): Promise<any> {
  const fetchPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  }

  const response = await fetch('http://127.0.0.1:8000/api/employee', fetchPayload)
  const jsonResponse = await response.json()

  console.log('Promise state', jsonResponse)
  return jsonResponse
}

export { createEmployee }
