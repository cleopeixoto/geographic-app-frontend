import axios from 'axios'

const backendInstance = axios.create({ baseURL: process.env.VUE_APP_BACKEND })

export async function getSubstations () {
  const response = await backendInstance.get('/substations')
    .catch((error) => { console.error('Could not complete your request with error: ', error.response) })

  return response.data
}
