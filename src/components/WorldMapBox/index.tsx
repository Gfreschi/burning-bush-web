import * as React from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>
  onCreated?(map: mapboxgl.Map): void
  onLoaded?(map: mapboxgl.Map): void
  onRemoved?(): void
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
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>()

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
      zoom: 9,
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

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.

      map.on('click', 'incidents', e => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice()
        const title = e.features[0].properties.title
        const severity = e.features[0].properties.severity
        const kind = e.features[0].properties.kind
        const details = e.features[0].properties.details

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<h3>${title}</h3><p>Severity: ${severity}</p><p>Kind: ${kind}</p><p>Details: ${details}</p>`
          )
          .addTo(map)
      })

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'incidents', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'incidents', () => {
        map.getCanvas().style.cursor = ''
      })
    })

    return () => {
      mapboxMap.remove()
      setMap(undefined)
      if (onRemoved) onRemoved()
    }
  }, [initialOptions, onCreated, onLoaded, onRemoved])

  return <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
}

export default MapboxMap

//       // map.addLayer({
//       //   id: 'points',
//       //   type: 'symbol',
//       //   source: {
//       //     type: 'geojson',
//       //     data: {
//       //       type: 'FeatureCollection',
//       //       features: incidentColection.map((incident: Incidents) => ({
//       //         type: 'Feature',
//       //         geometry: {
//       //           type: 'Point',
//       //           coordinates: [incident.longitude, incident.latitude],
//       //         },
//       //         properties: {
//       //           title: incident.title,
//       //           description: incident.details,
//       //         },
//       //       })),
//       //     },
//       //   },
//       //   layout: {
//       //     'icon-image': 'marker-15',
//       //     'icon-allow-overlap': true,
//       //   },
//       // })

//       // When a click event occurs on a feature in the places layer, open a popup at the
//       // location of the feature, with description HTML from its properties.

//       map.on('click', 'incidents', e => {
//         // Copy coordinates array.
//         const coodindates = e.features[0].geometry.coordinates.slice()
//         const description = e.features[0].properties.description

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coodindates[0]) > 180) {
//           coodindates[0] += e.lngLat.lng > coodindates[0] ? 360 : -360
//         }

//         new mapboxgl.Popup()
//           .setLngLat(coodindates)
//           .setHTML(description)
//           .addTo(map)
//       })

//       // Change the cursor to a pointer when the mouse is over the places layer.
//       map.on('mouseenter', 'places', () => {
//         map.getCanvas().style.cursor = 'pointer'
//       })

//       // Change it back to a pointer when it leaves.
//       map.on('mouseleave', 'places', () => {
//         map.getCanvas().style.cursor = ''
//       })

//       return () => {
//         mapboxMap.remove()
//         setMap(undefined)
//         if (onRemoved) onRemoved()
//       }
//     })
//   }, [])

//   return <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
// }

// export default MapboxMap
