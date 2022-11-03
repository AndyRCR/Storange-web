import React from 'react'
import { Outlet } from 'react-router-dom'
import CarritoModal from './CarritoModal/CarritoModal'
import DireccionModal from './DireccionModal/DireccionModal'
import Loader from './Loader/Loader'
import Navbar from './Navbar/Navbar'
import SecondaryNavbar from './SecondaryNavbar/SecondaryNavbar'

const Layout = () => {

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Navbar/>
      <Loader/>
      <CarritoModal/>
      <DireccionModal/>
      <Outlet/>
      <SecondaryNavbar/>
    </div>
  )
}

export default Layout