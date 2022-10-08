import * as React from 'react'
import Layout from 'src/components/Layout'
import { Button } from '@mui/material'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'
import { useAuthContext } from 'src/contexts/AuthContext'
import Link from 'next/link'
import { api } from 'src/services/api'
import DefaultCard from 'src/components/DefaultCard'
import { Complaint } from 'src/types/DataTypes'

export default function New() {
  // custom hook
  const { incidentCollection, hasIncidents } = useIncidentsContext()
  const { isAuthenticated, user } = useAuthContext()

  const [data, setData] = React.useState<Complaint>(null)

  React.useEffect(() => {
    api
      .get('api/v1/web/latest')
      .then(response => {
        setData(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  const complaintSample: Complaint = {
    id: 1,
    details: 'Complaint 1',
    severity: 10,
    kind: 1,
    latitude: 1,
    longitude: 1,
  }

  console.log(data)
  console.log(complaintSample)

  return (
    <>
      <Layout title="Incidents">
        <Button
          variant="contained"
          onClick={() => {
            console.log(user)
          }}
        >
          Get Incidents on console
        </Button>
        <br></br>
        <Link href="/complaints">Complaints Index</Link>
        <div>
          <h2>{user?.id}</h2>
          <h2>{user?.email}</h2>
          <h2>{user?.name}</h2>
          <h2>{user?.role}</h2>
        </div>

        <div>
          <h2>{data?.id}</h2>
          <h2>{data?.details}</h2>
          <h2>{data?.severity}</h2>
          <h2>{data?.kind}</h2>
          <h2>{data?.latitude}</h2>
          <h2>{data?.longitude}</h2>
          <img src={data?.image.url} alt="image" />
        </div>

        {hasIncidents ? (
          <h1>Number of incidents: {incidentCollection.length}</h1>
        ) : (
          <h1>No incidents</h1>
        )}
      </Layout>
    </>
  )
}
