import axios from 'axios'
import { parseCookies } from 'nookies'

// ctx from server
export function getAPIClient(ctx?: unknown) {
  const { bnb_access_token: token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  })

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return api
}
