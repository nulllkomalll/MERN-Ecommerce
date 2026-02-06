import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ShopContext } from './context/ShopContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile' 
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { token, setToken } = useContext(ShopContext);

  // This useEffect ensures that every time the page is hard-refreshed,
  // the token is wiped, forcing the user back to the login screen.
  useEffect(() => {
    setToken('');
    localStorage.removeItem('token');
  }, []);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      
      {!token ? (
        /* If no token (which is every time you refresh), show ONLY Login */
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      ) : (
        /* Only shows AFTER the user types credentials and hits 'Login' */
        <>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Navigate to='/' />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App