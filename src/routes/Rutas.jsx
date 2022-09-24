import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import ArticleView from '../views/ArticleView'
import DashboardView from '../views/DashboardView'
import LoginView from '../views/LoginView'
import RecoveryView from '../views/RecoveryView'
import RegisterView from '../views/RegisterView'

const Rutas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginView/>}/>
            <Route path='/recovery' element={<RecoveryView/>}/>
            <Route path='/register' element={<RegisterView/>}/>
            <Route path='/dashboard' element={<Layout/>}>
                <Route index element={<DashboardView/>}/>
                <Route path='/dashboard/item/:id' element={<ArticleView/>}/>
                {/* <Route path= element={<Dashboard/>}/>
                <Route index element={<Dashboard/>}/> */}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas