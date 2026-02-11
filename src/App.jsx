import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';

// Use the lazy function to optimize the size of the bundle. The pages will be loaded as they are needed in different js files in the bundle.
const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))

import SpinnerFullPage from './components/SpinnerFullPage'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'

import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import { Suspense } from 'react'

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          {/* BrowswerRouter creates the routes for the app. Anything outside the browserRouter will show up on every page. */}
          <BrowserRouter>
            {/* Suspense will display the Spinner component while the lazy-loaded components are being fetched */}
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                {/* url paths that will render the components */}
                {/* index element is the default component shown '/' */}
                <Route index element={<Homepage />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='product' element={<Product />} />
                <Route path='login' element={<Login />} />

                {/* APP ROUTE */}
                <Route
                  path='app'
                  element={
                    // app route and nested children will be protected
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* NESTED ROUTES INSIDE THE APP ROUTE /app/cities (CHILD ROUTES) that will render inside the app component */}
                  {/* The navigate component acts as a "redirect", "replace" allows you to go back to the previous screen when the back arrow in the browser is click*/}
                  {/* index element is the default nested component shown on route '/app' so that the route doesn't show a blank screen */}
                  <Route index element={<Navigate replace to='cities' />} />
                  <Route path='cities' element={<CityList />} />
                  {/* This route will display details about a specific city when it is clicked from the cities list */}
                  <Route path='cities/:id' element={<City />} />
                  <Route path='countries' element={<CountryList />} />
                  {/* Form for adding a city */}
                  <Route path='form' element={<Form />} />
                </Route>
                {/* This path will display when a route is not defined */}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  )
}

export default App
