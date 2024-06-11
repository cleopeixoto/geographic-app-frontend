import axios from 'axios'

const backendInstance = axios.create({ baseURL: process.env.VUE_APP_BACKEND })

// Substations
export async function getSubstations () {
  const response = await backendInstance.get('/substations')
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}

export async function getSubstation (id) {
  const response = await backendInstance.get(`/substations/${id}`)
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}

export async function createSubstation (data) {
  const response = await backendInstance.post('/substations', data)
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}

export async function deleteSubstation (id) {
  await backendInstance.delete(`/substations/${id}`)
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })
}

// Networks
export async function getNetworks () {
  const response = await backendInstance.get('/networks')
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}

export async function createNetwork (data) {
  const response = await backendInstance.post('/networks', data)
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}

export async function deleteNetwork (id) {
  const response = await backendInstance.delete(`/networks/${id}`)
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}
