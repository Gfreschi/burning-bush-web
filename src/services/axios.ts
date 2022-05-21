import axios from 'axios'
import { parseCookies } from 'nookies'

// precisa de um ctx vinda do servidor, por isso a distincao entre api e getApiClient
export function getApiClient(ctx?: any) {
  const { 'bnb_access_token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  })

  // ver infos enviadas
  api.interceptors.request.use(config => {
    console.log(config)

    return config
  })

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return api
}
