import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'
import { parseCookies } from 'nookies'
import { Box, Grid } from '@mui/material'
import DefaultCard from 'src/components/DefaultCard'
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
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {complaints.map((complaint: { id: React.Key }) => (
              <Grid item key={complaint.id} xl={3} lg={5} md={4} sm={6} xs={12}>
                <h1>{complaint.id}</h1>
                <DefaultCard item={complaint} classes={undefined} />
              </Grid>
            ))}
          </Grid>
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

  const res = await apiClient.get('/api/v1/complaints')

  const complaints: Complaint[] = res.data

  return {
    props: {
      complaints: complaints,
    },
  }
}
