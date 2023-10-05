/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useCities } from '../context/CitiesContext';

import styles from './CityItem.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

// "city" data comes from the CityList component.
function CityItem({ city }) {
  // currentCity is set by the "City" component when user clicks on one of the listed cities.
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  function handleOnDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {/* // this is to link to the cities/:id */}
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles[`cityItem--active`] : ''
        }`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleOnDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
