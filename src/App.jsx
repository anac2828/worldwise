import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='product' element={<Product />} />
          <Route path='login' element={<Login />} />
          {/* APP ROUTE */}
          <Route path='app' element={<AppLayout />}>
            {/* Default element that will be displayed on the app page */}
            <Route index element={<p>List of cites</p>} />
            {/* NESTED ROUTES (CHIELD ROUTES) */}
            <Route path='cities' element={<p>List of cities</p>} />
            <Route path='countries' element={<p>Counties</p>} />
            <Route path='form' element={<p>Form</p>} />
          </Route>
          {/*  */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
