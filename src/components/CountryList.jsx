import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../context/CitiesContext'

function CountryList() {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking a city on the map.' />
    )

  // Filter throught the cities to remove duplicate countries
  const countries = cities.reduce((arr, city) => {
    // arr = the empty array passed as the second arrgument in the reduce function
    //el is the current object (country info) found in the arr
    // Add the city.county as an object if it does not exist in the arr
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji, id: city.id }]
    // If it does exist return the current arr
    else return arr
  }, [])
  console.log(countries)
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  )
}

export default CountryList
