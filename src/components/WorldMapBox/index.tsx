import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2ZyZXNjaGlpIiwiYSI6ImNsMmRoNm52ZTAwZ2MzaXJ3MGJqd3I2NjQifQ.Gn1njvZQCcHTUt4MxbaVyA',
})

function WorldMapBox() {
  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    laitude: -22.407,
    longitude: -47.562,
    zoom: [13],
  })

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
    ></Map>
  )
}

export default Map
