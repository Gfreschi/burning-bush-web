import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@material-ui/core'
import WorldMapBox from '../components/WorldMapBox'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2ZyZXNjaGlpIiwiYSI6ImNsMmRoNm52ZTAwZ2MzaXJ3MGJqd3I2NjQifQ.Gn1njvZQCcHTUt4MxbaVyA',
})

// const [complaints, setComplaints] = React.useState([
//   {
//     id: 1,
//     latitude: -22.407,
//     longitude: -47.562,
//   },
// ])

export default function MapboxMap({ complaints }) {
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
            <Popup>
              <div>
                <h3>{complaint.title}</h3>
                <p>{complaint.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </Box>
  )
}
