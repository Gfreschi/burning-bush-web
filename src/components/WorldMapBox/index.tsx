import * as React from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>
  onCreated?(map: mapboxgl.Map): void
  onLoaded?(map: mapboxgl.Map): void
  onRemoved?(): void
  onComplaintCreation(): string
}

type Incidents = {
  id: number
  title: string
  severity: number
  kind: number
  details: string
  latitude: number
  longitude: number
}

const incidentColection = [
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

function MapboxMap({
  initialOptions = {},
  onCreated,
  onLoaded,
  onRemoved,
  onComplaintCreation,
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>()
  const [complaint, setComplaint] = React.useState('undefined')
  const [marker, setMarker] = React.useState<mapboxgl.Marker>()

  const mapNode = React.useRef(null)

  React.useEffect(() => {
    const node = mapNode.current

    if (typeof window === 'undefined' || node === null) return

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken:
        'pk.eyJ1IjoiZ2ZyZXNjaGlpIiwiYSI6ImNsMmRoNm52ZTAwZ2MzaXJ3MGJqd3I2NjQifQ.Gn1njvZQCcHTUt4MxbaVyA',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-47.57, -22.41],
      zoom: 13,
      ...initialOptions,
    })

    setMap(mapboxMap)

    const map = mapboxMap

    if (onCreated) onCreated(mapboxMap)

    if (onLoaded) mapboxMap.once('load', () => onLoaded(mapboxMap))

    map.on('load', () => {
      map.addSource('incidents', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: incidentColection.map(incident => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [incident.longitude, incident.latitude],
            },
            properties: {
              title: incident.title,
              severity: incident.severity,
              kind: incident.kind,
              details: incident.details,
              icon: 'theatre-15',
            },
          })),
        },
      })

      map.addLayer({
        id: 'incidents',
        type: 'symbol',
        source: 'incidents',
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
        },
      })

      // when a hover event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('mouseenter', 'incidents', e => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer'

        const coordinates = e.features[0].geometry.coordinates.slice()
        const title = e.features[0].properties.title
        const severity = e.features[0].properties.severity
        const kind = e.features[0].properties.kind
        const details = e.features[0].properties.details

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<h3>${title}</h3><p>Severity: ${severity}</p><p>Kind: ${kind}</p><p>Details: ${details}</p>`
          )
          .addTo(map)
      })

      // When the mouse leaves the places layer, update the feature state of the
      // previously hovered feature and close the popup.
      map.on('mouseleave', 'incidents', () => {
        map.getCanvas().style.cursor = ''
      })

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'incidents', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      // When click in the map, create a marker, add to the map and save the coordinates
      // show the form to create a new complaint and save the coordinates
      map.on('click', e => {
        const newMarker = new mapboxgl.Marker()
          .setLngLat(e.lngLat)
          .addTo(map)

          // add a popup to the marker and open it
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `Add a new complaint here? <button onClick={onComplaintCreation}>New</button>`
              )
          )
          .togglePopup()

        // remove the marker when the popup is closed
        newMarker.getPopup().once('close', () => {
          newMarker.remove()
        })

      })
    })

    return () => {
      mapboxMap.remove()
      setMap(undefined)
      if (onRemoved) onRemoved()
    }
  }, [initialOptions, onCreated, onLoaded, onRemoved, onComplaintCreation])

  return <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
}

export default MapboxMap

// // function to verify if there is a marker on the map
// function hasMarker() {
//   if (map.getLayer('marker')) {
//     return true
//   } else {
//     return false
//   }
// }
// // function to remove the last marker from the map
// function removeMarker() {
//   if (hasMarker()) {
//     map.removeLayer('marker')
//     map.removeSource('marker')
//   }
// }
// // function to add a marker on the map
// function addMarker() {
//   const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map)
//   setComplaint(marker)
// }
// set the state of the complaint
// setComplaint({
//   longitude: e.lngLat.lng,
//   latitude: e.lngLat.lat,
// })
