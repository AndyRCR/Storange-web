import React from 'react'
import Layout from '../components/Layout'
import ArticleView from '../views/ArticleView'
import DashboardView from '../views/DashboardView'
import LoginView from '../views/LoginView'
import RecogerEnviarView from '../views/RecogerEnviarView'
import RecoveryView from '../views/RecoveryView'
import RegisterView from '../views/RegisterView'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../tools/ScrollToTop'
import PerfilContainer from '../components/PerfilContainer/PerfilContainer'

const Rutas = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
            <Route path='/' element={<LoginView/>}/>
            <Route path='/recovery' element={<RecoveryView/>}/>
            <Route path='/register' element={<RegisterView/>}/>
            <Route path='/dashboard' element={<Layout/>}>
                <Route index element={<DashboardView/>}/>
                <Route path='/dashboard/item/:id' element={<ArticleView/>}/>
            </Route>
            <Route path='/pickup_send' element={<Layout/>}>
              <Route index element={<RecogerEnviarView/>}/>
            </Route>
            <Route path='/perfil' element={<Layout/>}>
              <Route index element={<PerfilContainer/>}/>
            </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default Rutas