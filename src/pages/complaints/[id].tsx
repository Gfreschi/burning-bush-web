import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout'
import { getAPIClient } from 'src/services/axios'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'
import { parseCookies } from 'nookies'

interface ComplaintProps {
  complaint: Complaint
}

export default function Index({ complaint }: ComplaintProps) {
  if (!complaint) {
    return <h1> Loading... </h1>
  }

  return (
    <>
      <Layout title="Complaints">
        <h1>Complaints</h1>
        <h2>{complaint.id}</h2>
        <h2>{complaint.details}</h2>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  // send a ctx to api client to server side render fetch jwt token
  const apiClient = getAPIClient(ctx)

  // fetch token from cookies
  const { bnb_access_token: token } = parseCookies(ctx)

  // authentication server side
  // if token is not present, redirect to login page
  if (!token) {
    return {
      redirect: {
        destination: '/sessions/sign_in',
        permanent: false,
      },
    }
  }

  const res = await apiClient.get('/api/v1/complaints/', {
    params: {
      id: ctx.params.id,
    },
  })

  const complaint: Complaint = res.data

  return {
    props: {
      complaint: complaint,
    },
  }
}
