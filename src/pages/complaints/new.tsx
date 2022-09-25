import * as React from 'react'
import Layout from 'src/components/Layout'
import { Button } from '@mui/material'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'

export default function New() {
  // custom hook
  const { incidentCollection, hasIncidents } = useIncidentsContext()

  return (
    <>
      <Layout title="Incidents">
        <Button
          variant="contained"
          onClick={() => {
            console.log(incidentCollection)
          }}
        >
          Get Incidents
        </Button>
        {hasIncidents ? (
          <h1>Number of incidents: {incidentCollection.length}</h1>
        ) : (
          <h1>No incidents</h1>
        )}
      </Layout>
    </>
  )
}
