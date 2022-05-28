import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@material-ui/core'
import WorldMapBox from '../components/WorldMapBox'
import { useFetch } from '../hooks/useFetch'

type Complaint = {
  id: number
  latitude: number
  longitude: number
}
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2ZyZXNjaGlpIiwiYSI6ImNsMmRoNm52ZTAwZ2MzaXJ3MGJqd3I2NjQifQ.Gn1njvZQCcHTUt4MxbaVyA',
})

export default function MapboxMap() {
  const [complaints, setComplaints] = useState<Complaint[] | null>([])

  const fetchedComplaint = [
    { id: 0, latitude: -22.407, longitude: -47.562 },
    { id: 1, latitude: -22.107, longitude: -47.562 },
    { id: 2, latitude: -22.207, longitude: -47.562 },
    { id: 3, latitude: -22.307, longitude: -47.562 },
    { id: 4, latitude: -22.507, longitude: -47.562 },
  ]

  useEffect(() => {
    setComplaints(fetchedComplaint)
  }, [])

  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    latitude: -22.407,
    longitude: -47.562,
    zoom: [13],
  })
  return (
    <Box>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[-47.562, -22.407]} // long and lat
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        {...viewport}
      >
        {complaints.map(complaint => (
          <Marker
            key={complaint.id}
            coordinates={[complaint.longitude, complaint.latitude]}
            anchor="bottom"
          >
            <Popup
              key={complaint.id}
              coordinates={[complaint.longitude, complaint.latitude]}
              anchor="bottom"
            >
              <div>
                <h3>Complaint - {complaint.id}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </Box>
  )
}
