import Link from 'next/link'
import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'

interface Complaint {
  id: number
  severity: number
  details: string
}

export default function Index() {

  //persistindo dado do usuario apos a autenticacao
  const { user } = useContext(AuthContext)

  const { data } = useFetch<Complaint[]>('/api/v1/mobile/complaints')

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={user?.avatar_url} alt="logo" />
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a>{item.details}</a>
            <Link href={`/complaints/${item.id}`}>
              <a>SHOW</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
