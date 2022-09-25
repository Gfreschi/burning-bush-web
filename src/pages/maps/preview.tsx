import { useState } from 'react'
import MapLoadingHolder from 'src/components/WorldMapBox/map-loading-holder'
import Layout from '../../components/Layout'
import WorldMapBox from '../../components/WorldMapBox'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'

const incidentColectionExample = [
  {
    id: 1,
    title: 'Incidente 1',
    severity: 1,
    kind: 1,
    details: 'Detalhes do incidente 1',
    latitude: -22.41,
    longitude: -47.57,
  },
  {
    id: 2,
    title: 'Incidente 2',
    severity: 2,
    kind: 2,
    details: 'Detalhes do incidente 2',
    latitude: -22.42,
    longitude: -47.57,
  },
]

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
