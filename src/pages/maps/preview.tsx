import { useEffect, useState } from 'react'
import MapLoadingHolder from 'src/components/WorldMapBox/map-loading-holder'
import Layout from '../../components/Layout'
import WorldMapBox from '../../components/WorldMapBox'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'

export default function Preview() {
  const { incidentCollection } = useIncidentsContext()
  const [loading, setLoading] = useState(true)
  const handleMapLoading = () => setLoading(false)

  return (
    <div className="container">
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
