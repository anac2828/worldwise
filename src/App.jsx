import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';

// Use the lazy function to uptimize the size of the bundle. The pages will be loaded as they are needed.
const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

import SpinnerFullPage from './components/SpinnerFullPage';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='product' element={<Product />} />
                <Route path='login' element={<Login />} />

                {/* APP ROUTE */}
                <Route
                  path='app'
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }>
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
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
