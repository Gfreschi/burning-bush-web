import { useState } from 'react'
import MapLoadingHolder from 'src/components/WorldMapBox/map-loading-holder'
import Layout from '../../components/Layout'
import WorldMapBox from '../../components/WorldMapBox'

export default function Preview() {
  const [loading, setLoading] = useState(true)
  const handleMapLoading = () => setLoading(false)

  return (
    <div className="container">
      <Layout title={'Map Preview'}>
        <WorldMapBox
          initialOptions={{ center: [-47.57, -22.41] }}
          onLoaded={handleMapLoading}
          onComplaintRegistration={() => console.log('Complaint registered')}
        />
        {loading && <MapLoadingHolder className="loading-holder" />}
      </Layout>
    </div>
  )
}
