/* export async function postEmployee(formData): Promise {
  const controller = new AbortController()
  const { signal } = controller
  
  const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: formData,
      signal
    }
    try {
      const response = await fetch('http://localhost:3001/api/v1/create-employee', fetchParams)
      return response.json()
    } catch {
      signal.aborted ? console.log('request canceled') : console.error('request failed')
    }

} */

export {}