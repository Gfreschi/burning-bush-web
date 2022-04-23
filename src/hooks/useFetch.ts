import useSWR from 'swr'
import { api } from '../services/api'

export function useFetch<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(
    url,
    async url => {
      const response = await api.get(url)
      const data = await response.data

      return data
    },
    {}
  )

  return { data, error }
}
