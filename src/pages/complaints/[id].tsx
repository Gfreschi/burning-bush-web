import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Layout from 'src/components/Layout'
import { useFetch } from 'src/hooks/useFetch'
import { getApiClient } from 'src/services/axios'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'

export default function Index({ message }) {
  if (!message) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout title="Complaints">
        <h1>Complaints</h1>
        <h2>{message}</h2>
        <Link href="/complaints/new">
          <a>Create new complaint</a>
        </Link>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params
  const result = await getApiClient(id)

  const complaint: Complaint = await result

  return {
    props: { result },
  }
}
