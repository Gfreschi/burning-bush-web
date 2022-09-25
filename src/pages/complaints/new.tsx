import * as React from 'react'
import Layout from 'src/components/Layout'
import { Button } from '@mui/material'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'
import { useAuthContext } from 'src/contexts/AuthContext'
import Link from 'next/link'

export default function New() {
  // custom hook
  const { incidentCollection, hasIncidents } = useIncidentsContext()
  const { isAuthenticated, user } = useAuthContext()

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

        {hasIncidents ? (
          <h1>Number of incidents: {incidentCollection.length}</h1>
        ) : (
          <h1>No incidents</h1>
        )}
      </Layout>
    </>
  )
}
