import axios from 'axios'

const backendInstance = axios.create({ baseURL: process.env.VUE_APP_BACKEND })

function handleError (error) {
  console.error('Could not complete your request with error: ', error.response)
}

// Substations
export async function getSubstations () {
  const response = await backendInstance.get('/substations')
    .catch((error) => { handleError(error) })

  return response.data
}

export async function getSubstation (id) {
  const response = await backendInstance.get(`/substations/${id}`)
    .catch((error) => { handleError(error) })

  return response.data
}

export async function createSubstation (data) {
  const response = await backendInstance.post('/substations', data)
    .catch((error) => { handleError(error) })

  return response.data
}

export async function editSubstation (data) {
  const response = await backendInstance.put('/substations', data)
    .catch((error) => { handleError(error) })

  return response.data
}

export async function deleteSubstation (id) {
  await backendInstance.delete(`/substations/${id}`)
    .catch((error) => { handleError(error) })
}

// Networks
export async function getNetworks () {
  const response = await backendInstance.get('/networks')
    .catch((error) => { handleError(error) })

  return response.data
}

export async function createNetwork (data) {
  const response = await backendInstance.post('/networks', data)
    .catch((error) => { handleError(error) })

  return response.data
}

export async function deleteNetwork (id) {
  const response = await backendInstance.delete(`/networks/${id}`)
    .catch((error) => { handleError(error) })

  return response.data
}
