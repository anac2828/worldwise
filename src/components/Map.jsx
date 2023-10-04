import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

// CONTEXT PROVIDER
import { useCities } from '../context/CitiesContext';
// CUSTOM HOOKS
import { useGeolocation } from '../hooks/useGeoLocation';
import { useURLPosition } from '../hooks/useURLPosition';

//COMPONENTS
import Button from './Button';
import styles from './Map.module.css';

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  // Cities Context provider
  const { cities } = useCities();
  // custom Geolocation hook
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useURLPosition();
  console.log(mapLat, mapLng);
  // we need use Effect to keep current city on map when the lists of cities is displayed. "mapPosition" will change when the user clicks on a city from the list using the location state in the URL.
  // useEffect is monstly a syncronizaiton system
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // geoLocation will change when user clicks the "Use your location button"
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    // "form" is the url. The form will open when the map is clicked.
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading ...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  // Hook provided by leaflet
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  // useNavigate returns the navigate function. 'navigate' will add a path to the url
  const navigate = useNavigate();
  // pass an object to define different types of events
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
