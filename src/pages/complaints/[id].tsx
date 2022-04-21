import react from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useRouter } from 'next/router'
import Link from 'next/link'
interface Complaint {
  id: number
  severity: number
  details: string
}

export default function ShowComplaint() {

  const { query: { id } } = useRouter()
  const { data } = useFetch<Complaint>(`http://localhost:3000/api/v1/mobile/complaints/${id}`)

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>ID: {data.id}</h1>
      <p>Severity: {data.severity}</p>
      <p>Detalhes: {data.details}</p>
      <br></br>
      <Link href={`/complaints/`}>
        <a>INDEX</a>
      </Link>
    </div>
  )
}
