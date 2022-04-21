import react from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

interface Complaint {
  id: number
  severity: number
  details: string
}

export default function ShowComplaint() {

  const { id } = useParams()
  const { data } = useFetch<Complaint>(`http://localhost:3000/api/v1/mobile/complaint/${id}`)

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>ID: {data.id}</h1>
      <p>Severity: {data.severity}</p>
      <p>Detalhes: {data.details}</p>
    </div>
  )
}


