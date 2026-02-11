import { useNavigate } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { useEffect, useState } from 'react'

// CONTEXT PROVIDER
import { useCities } from '../context/CitiesContext'
// CUSTOM HOOKS
import { useGeolocation } from '../hooks/useGeoLocation'
import { useURLPosition } from '../hooks/useURLPosition'

//COMPONENTS
import Button from './Button'
import styles from './Map.module.css'

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  // Cities Context provider
  const { cities } = useCities()
  // custom hook to get lat and lng cordinates
  const [mapLat, mapLng] = useURLPosition()
  // custom Geolocation hook
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation()

  //  useEffect runs when the mapLat or mapLng change in the URL when the map is clicked and the map will be re-centered by the ChangeCenter component
  // useEffect is monstly a syncronizaiton system
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
  }, [mapLat, mapLng])

  // Check for geoLocation position to update map position state.
  // Use effect will run when geoLocationPostion is updated by clicking the "Use your position" button or if the browser allows automactic geo location
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }
  }, [geoLocationPosition])

  return (
    //  USE YOUR POSITION BUTTON IF THE BROWERS CANNOT AUTOMATICALLY GET THE GEO LOCATION
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading ...' : 'Use your position'}
        </Button>
      )}

      {/* MAP *** */}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        {/* changes the style of the map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />

        {/* Markers on map of user added cities */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            {/* Marker info when it is clicked on */}
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* Necessary to recenter the map when a new city is displayed */}
        <ChangeCenter position={mapPosition} />
        {/* Updates mapLat and mapLng. Opens Form component */}
        <OnMapClick />
      </MapContainer>
    </div>
  )
}

// Component to recenter the map when a new city datails is displayed
function ChangeCenter({ position }) {
  // Hook provided by leaflet
  const map = useMap()
  map.setView(position)
  return null
}

function OnMapClick() {
  // useNavigate returns the navigate function. 'navigate' will add a path to the url
  const navigate = useNavigate()
  // leaflet hook - pass an object to define different types of events
  useMapEvents({
    click: (e) => {
      // Event object from the leaflet library
      // nested route that displays form component on the <SideBar>
      // Stores lat and lng info in the URL for the Form to have access to it
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
}

export default Map
