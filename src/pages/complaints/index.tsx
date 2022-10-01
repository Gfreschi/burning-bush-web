import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'
import { api } from 'src/services/api'
import { Box, Grid } from '@mui/material'
import DefaultCard from 'src/components/DefaultCard'

export default function Index(props) {
  const { complaints } = props

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
            {complaints.map((item: { id: React.Key }) => (
              <Grid item key={item.id} xl={3} lg={5} md={4} sm={6} xs={12}>
                <DefaultCard item={item} classes={undefined} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await api.get('/api/v1/mobile/complaints')

  const complaints: Complaint[] = res.data

  return {
    props: {
      complaints: complaints,
    },
  }
}
