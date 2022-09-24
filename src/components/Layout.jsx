import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const Layout = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout