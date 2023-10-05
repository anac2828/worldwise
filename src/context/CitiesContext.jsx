import {
  createContext,
  // useState,
  useEffect,
  useContext,
  useReducer,
} from 'react';
const URL = 'http://localhost:8000';

// 1
const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'loading': {
      return { ...state, isLoading: true };
    }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action type');
  }
}

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  erro: '',
};

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  //   FETCH MULTIPLE CITIES
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        // setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
        // setCities(data);
      } catch {
        // alert('There was an error loading data ...');

        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data ...',
        });
      }
    };
    fetchCities();
  }, []);

  //   GET INFO FOR ONE CITY
  async function getCity(id) {
    // to prevent the API from fetching the city data if the same city is clicked.
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);

      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      // alert('There was an error loading data ...');
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data ...',
      });
    }
  }

  async function createCity(city) {
    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      const res = await fetch(`${URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: { 'Content-type': 'application/json' },
      });
      const data = await res.json();

      // setCities((cities) => [...cities, data]);
      dispatch({ type: 'city/created', payload: data });
    } catch {
      // alert('There was an error creating city.');
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city.',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      // setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: 'DELETE',
      });
      // cities has the old state that still has the deleted city
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      // alert('There was an error deleting city.');

      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city.',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

// custom hook to consume the provider value.
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
