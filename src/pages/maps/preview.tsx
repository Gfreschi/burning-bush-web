import { useEffect, useState } from 'react'
import MapLoadingHolder from 'src/components/WorldMapBox/map-loading-holder'
import Layout from '../../components/Layout'
import WorldMapBox from '../../components/WorldMapBox'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'
import { CssBaseline } from '@mui/material'

export default function Preview() {
  const { incidentCollection, initialUserCoordinates } = useIncidentsContext()
  const [loading, setLoading] = useState(true)
  const handleMapLoading = () => setLoading(false)

  // before render map fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          initialUserCoordinates({ latitude, longitude })
        },
        error => {
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <div className="container">
      <CssBaseline />
      <Layout title={'Map'}>
        <WorldMapBox
          initialOptions={{ center: [-47.57, -22.41] }}
          incidentCollection={incidentCollection}
          onLoaded={handleMapLoading}
        />
        {loading && <MapLoadingHolder className="loading-holder" />}
      </Layout>
    </div>
  )
}
