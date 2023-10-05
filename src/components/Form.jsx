// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// custom hook
import { useURLPosition } from '../hooks/useURLPosition';

// CONTEXT
import { useCities } from '../context/CitiesContext';

import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';
import styles from './Form.module.css';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  // lat and lng will be set when user clicks on the map and the form component will be displayed.
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(true);
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const navigate = useNavigate();

  const [lat, lng] = useURLPosition();
  const { createCity, isLoading } = useCities();

  // const emoji = convertToEmoji();

  // REVERSE GEOLOCATION to get the location that was clicked on the map. Use effect  will rund when the url changes
  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        // state
        setIsLoadingGeocoding(true);
        setError('');

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        // if a city was not clicked
        if (!data.countryCode)
          throw new Error(
            `That doesn't seem to be a city. Click somewhere else 😉.`
          );

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        convertToEmoji(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  // FORM SUBMIT HANDLER
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // Sends a POST request to create a city. CitiesContext function (useCities)
    await createCity(newCity);
    // react-dom import
    navigate('/app/cities');
  }

  if (!lat && !lng) return <Message message='Start by clicking on the map.' />;
  if (isLoadingGeocoding) return <Spinner />;

  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>

        <ReactDatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={'MM/dd/yyyy'}
          id='date'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
