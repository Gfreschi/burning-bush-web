import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from 'src/components/Layout'
import { Complaint } from 'src/types/DataTypes'
import ErrorPage from 'next/error'
import { api } from 'src/services/api'

export default function Index(props) {
  console.log(props.error)
  return (
    <>
      <Layout title="Complaints">
        <h1>Complaints</h1>
        {/* <h1>{complaints.length}</h1> */}
        <Link href="/complaints/new">
          <a>Create new complaint</a>
        </Link>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await api.get('/api/v1/mobile/complaints')

    return {
      props: {
        complaints: res,
      },
    }
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    }
  }
}
