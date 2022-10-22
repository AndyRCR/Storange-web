import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/GlobalStateContext'
import ArticlesList from '../ArticlesList/ArticlesList'
import Filters from '../Filters/Filters'
import './DashboardContainer.css'

const DashboardContainer = () => {

  const {buscarPropietario, propietario, buscarOrdenes, ordenesEnProgreso} = useContext(GlobalContext)

  useEffect(() => {
    if(propietario === null) buscarPropietario()
    if(ordenesEnProgreso === null) buscarOrdenes()
  }, [])

  return (
    <div className='dashboardContainer'>
        <Filters/>
        <ArticlesList/>
    </div>
  )
}

export default DashboardContainer