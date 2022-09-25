import * as React from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import NewComplaintForm from '../Complaints/NewComplaintForm'
import { AuthContext } from '../../contexts/AuthContext'
import { useSnackbar } from 'notistack'
import { Incident } from '../../types/Incident'
import { pulsingDot } from 'src/components/WorldMapBox/incident-icon'
interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>
  incidentCollection?: Incident[]
  onCreated?(map: mapboxgl.Map): void
  onLoaded?(map: mapboxgl.Map): void
  onRemoved?(): void
}

function MapboxMap({
  initialOptions = {},
  incidentCollection,
  onCreated,
  onLoaded,
  onRemoved,
}: MapboxMapProps) {
  const { isAuthenticated } = React.useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const [map, setMap] = React.useState<mapboxgl.Map>()
  const [complaintCoordinates, setComplaintCoordinates] =
    React.useState<mapboxgl.LngLat>(null)

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

    const mustAuthenticateAlert = () => {
      enqueueSnackbar('Você precisa estar logado para criar uma queixa', {
        variant: 'error',
      })
    }

    if (onCreated) onCreated(mapboxMap)

    if (onLoaded) mapboxMap.once('load', () => onLoaded(mapboxMap))

    const map = mapboxMap

    map.on('load', () => {
      // svg animation for incident icon
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

      map.addSource('incidents', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: incidentCollection.map(incident => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                incident.location.latitude,
                incident.location.longitude,
              ],
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
          'icon-image': 'pulsing-dot',
        },
      })

      map.addControl(new mapboxgl.NavigationControl())

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
        const incidentPopup = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<h3>${title}</h3><p>Severity: ${severity}</p><p>Kind: ${kind}</p><p>Details: ${details}</p>`
          )
          .addTo(map)

        map.on('mouseleave', 'incidents', () => {
          map.getCanvas().style.cursor = ''
          incidentPopup.remove()
        })
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
        const handleClick = () => {
          if (isAuthenticated) {
            setComplaintCoordinates(e.lngLat)
            renderComplaintForm(e.lngLat)
          } else {
            mustAuthenticateAlert()
          }
        }

        const divElement = document.createElement('div')

        const assignBtn = document.createElement('div')

        assignBtn.innerHTML = `<button type="button">Register</button>`

        divElement.innerHTML = `
        <div>
          <h3>Complaint Registration</h3>
          <p>Latitude: ${e.lngLat.lat}</p>
          <p>Longitude: ${e.lngLat.lng}</p>
        </div>`

        divElement.appendChild(assignBtn)

        assignBtn.addEventListener('click', () => {
          handleClick()
        })

        const marker = new mapboxgl.Marker()
          .setLngLat(e.lngLat)
          .addTo(map)
          // add a popup to the marker and open it
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setDOMContent(divElement)
          )
          .togglePopup()
        // remove the marker when the popup is closed
        marker.getPopup().once('close', () => {
          marker.remove()
        })
      })
    })

    return () => {
      mapboxMap.remove()
      setMap(undefined)
      if (onRemoved) onRemoved()
    }
  }, [initialOptions, incidentCollection, onCreated, onLoaded, onRemoved])

  function renderComplaintForm(coordinates: mapboxgl.LngLat) {
    return (
      <div>
        <>
          <NewComplaintForm
            complaintCoodinate={{
              longitude: coordinates.lng,
              latitude: coordinates.lat,
            }}
          />
        </>
      </div>
    )
  }

  return (
    <>
      <div ref={mapNode} style={{ width: '100%', height: '100%' }}>
        {complaintCoordinates && renderComplaintForm(complaintCoordinates)}
      </div>
    </>
  )
}

export default MapboxMap
