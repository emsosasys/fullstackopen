import axios from 'axios'
const baseUrl = '/api/auth/'

export const authLogin = (credentials) => {
  const request = axios.post('/login', credentials, {
    baseURL: baseUrl
  })

  return request.then(response => response.data)
}
