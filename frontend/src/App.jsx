import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Header from './components/Header';
import Products from './components/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import { Toaster } from "react-hot-toast"
import useFetchUser from './hooks/useFetchUser';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
const App = () => {
  const loading = useFetchUser()
 const isAuth = useSelector(state=>state.auth.isAuth)
  return (
    <>
      {
        loading ? <Loading /> :  <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={isAuth ? <Home/>:<Login />} />
          <Route path='/register' element={ isAuth ? <Home/> : <Register />} />
          <Route path='/verify' element={ isAuth ? <Home/> : <Verify />} />
        </Routes>
      </BrowserRouter>
      }
    </>
  )
}

export default App
