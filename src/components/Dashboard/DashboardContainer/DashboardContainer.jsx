import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { GlobalContext } from '../../../context/GlobalStateContext'
import ArticlesList from '../ArticlesList/ArticlesList'
import Filters from '../Filters/Filters'
import './DashboardContainer.css'

const DashboardContainer = () => {

  const { buscarPropietario, propietario, buscarOrdenes, ordenesEnProgreso, filtersDisplayed, setFiltersDisplayed, swalCambio, setSwalCambio, change, setChange, setLoaderState } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [resize, setResize] = useState(window.innerWidth < 1000)

  const handleResize = () => {
    setResize(window.innerWidth < 1000)
    if(window.innerWidth > 1000) setFiltersDisplayed(true)
  }

  useEffect(() => {
    if (propietario === null){
      buscarPropietario()
    }
    else{
      if(propietario.primerCambio === 0 && swalCambio){
        setSwalCambio(false)
        setTimeout(() => {
          Swal.fire({
            title: `Hola ${propietario.nombre}!`,
            text: 'Su cuenta nueva tiene una contraseña autogenerada, es recomendable realizar un cambio de contraseña',
            icon: 'info',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Ok, vamos',
            denyButtonText: 'Más tarde',
          }).then((result) => {
            if (result.isConfirmed) {
              setChange(!change)
              setLoaderState(0)
              setTimeout(() => navigate('/perfil'), 500)
            }
            setSwalCambio(false)
          })
        }, 1500)
      }
    }
    if (ordenesEnProgreso === null) buscarOrdenes()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [resize, propietario])

  return (
    <div className={filtersDisplayed && resize ? 'dashboardContainer displayed' : 'dashboardContainer'}>
      <Filters />
      <ArticlesList />
    </div>
  )
}

export default DashboardContainer