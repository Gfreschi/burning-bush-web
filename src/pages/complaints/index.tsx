import React from 'react'
import { useFetch } from '../../hooks/useFetch'

interface Complaint {
  id: number
  severity: number
  details: string
}

export default function Index() {

  const { data } = useFetch<Complaint[]>('http://localhost:3000/api/v1/mobile/complaints')

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a>{item.details}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
