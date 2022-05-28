import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'

import { AuthContext } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { getApiClient } from '../../services/axios'

interface Complaint {
  id: number
  severity: number
  details: string
}

export default function Index() {
  // persistindo dado do usuario apos a autenticacao
  const { user } = useContext(AuthContext)
  const { data } = useFetch<Complaint[]>('/api/v1/complaints')

  console.log(user)
  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <Layout title="Complaints">
      <h2>User</h2>
      <ul>
        <li>{user?.id}</li>
        <li>{user?.name}</li>
        <li>{user?.email}</li>
        <li>{user?.createdAt}</li>
      </ul>
      <h3>Complaints</h3>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a>{item.details}</a>
            <a> - {item.id}: </a>
            <Link href={`/complaints/${item.id}`}>
              <a>SHOW</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

// validando a autenticacao do usuario nesta pagina
export const getServerSideProps = async ctx => {
  const apiClient = getApiClient(ctx)
  const { 'bnb_access_token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  apiClient.defaults.headers.Authorization = `Bearer ${token}`
  // const { data } = await api.get('/api/v1/mobile/complaints')

  return {
    props: {},
  }
}
