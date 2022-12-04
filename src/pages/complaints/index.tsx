import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'
import { parseCookies } from 'nookies'
import { Box, Grid } from '@mui/material'
import ComplaintCard from 'src/components/Complaints/ComplaintCard'
import { getAPIClient } from 'src/services/axios'

interface ComplaintsProps {
  complaints: Complaint[]
}

export default function Index({ complaints }: ComplaintsProps) {
  if (!complaints) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout title="Home">
        <Box p={2}>
          {complaints.map(complaint => (
            <Box
              key={complaint.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                p: 20,
                border: '1px solid #eaeaea',
              }}
            >
              <ComplaintCard complaint={complaint} />
            </Box>
          ))}
        </Box>
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

  const res = await apiClient.get('/api/v1/web/complaints')

  const complaints: Complaint[] = res.data

  return {
    props: {
      complaints: complaints,
    },
  }
}
