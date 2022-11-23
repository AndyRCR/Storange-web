import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import CarritoDeEnvio from '../CarritoDeEnvio/CarritoDeEnvio'
import FormDireccion from '../FormDireccion/FormDireccion'
import Swal from 'sweetalert2'
import FormFecha from '../FormFecha/FormFecha'
import { useState } from 'react'
import './FormEnvio.css'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#fff !important',
    width: '150px !important',
    height: 'fit-content !important'
  },
  buttonWhite: {
    backgroundColor: '#fff !important',
    border: '1px solid #f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#f94700 !important',
    width: '150px !important',
  }
})

const FormEnvio = () => {

  const classes = useStyles()

  const { browser, formEnvioPage, setFormEnvioPage, carrito, oe, propietario, actualizarOrdenes, obtenerServicio, isLoading, setIsLoading, setOe } = useContext(GlobalContext)

  const [interaction, setInteraction] = useState(true)

  const sendData = async () => {
    setIsLoading(true)

    Swal.fire({
      title: 'Se realizo la orden de envío',
      icon: 'success'
    })

    obtenerServicio()
    actualizarOrdenes()
  }

  const handleResize = () =>{
    
    if(browser === 'Safari'){
      const width = document.querySelector('.fluxSection').clientWidth
      document.querySelector('.fluxSection').style.width = `${width}px`
  
      document.querySelectorAll('.fluxSection .test').forEach(el => {
        el.style.width = `${width}px`
        el.style.transform = `translateX(${width * formEnvioPage}px)`
      })
    } else{
      const height = Array.from(document.querySelectorAll('.fluxSection .test')).map(el => el.clientHeight).sort().at(-1)
      document.querySelector('.fluxSection').style.height = `${height}px`
  
      document.querySelectorAll('.fluxSection .test').forEach(el => {
        el.style.height = `${height}px`
        el.style.transform = `translateY(${height * formEnvioPage}px)`
      })
    }
  }

  useEffect(() => {
    if(interaction){
      setFormEnvioPage(browser === 'Safari' ? -1 :  2)
      setInteraction(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [formEnvioPage])

  return (
    <div className={`section fluxSection ${browser === 'Safari' ? 'safari' :''}`}>
      <CarritoDeEnvio />
      <FormDireccion />
      <FormFecha />
      <div className={browser === 'Safari' ? 'test safari' : 'test'}>
        <div className="resumen">
          <div className='formButtons'>
            <Button onClick={() => setFormEnvioPage(browser === 'Safari' ? -0.5 :  0)} className={classes.buttonWhite}>
              Atrás
            </Button>
          </div>
          <div>
            {carrito !== null && carrito.length > 0 ? (
              <>
                <p><span>m³ Totales: </span><span>{carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(4)))} m³</span></p>
                <p><span>Dirección de envio: </span><span>{oe.direccion}</span></p>
                <p><span>Tipo de servicio: </span><span>Normal</span></p>
                <p><span>Fecha de envio: </span><span>{oe.fecha}</span></p>
                <p><span>Total a pagar: </span><span>S/.{carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(4))) < 1 ? 40 : carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))) * 40}</span></p>
              </>
            ) : (
              <h1>Cargando</h1>
            )}
          </div>
          <div>
            <Button className={classes.button} onClick={sendData}>
              {isLoading ? <CircularProgress style={{width: '20px', height: '20px', color:'#fff'}}/> : 'Finalizar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEnvio