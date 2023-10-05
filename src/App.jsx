import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='product' element={<Product />} />

              <Route path='login' element={<Login />} />

              {/* APP ROUTE */}
              <Route path='app' element={<AppLayout />}>
                {/* NESTED ROUTES (CHIELD ROUTES) */}
                {/* Default element that will be displayed on the app page */}
                {/* The navigate component acts as a "redirect", "replace" will take you back to the previous screen when the back arrow in the browser is click*/}
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                {/* This route will display details about a specific city when it is clicked from the cities list */}
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              {/*  */}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
