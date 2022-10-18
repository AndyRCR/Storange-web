import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import CarritoDeEnvio from '../CarritoDeEnvio/CarritoDeEnvio'
import FormDireccion from '../FormDireccion/FormDireccion'
import { db } from '../../service/Firebase'
import { addDoc, collection, doc } from 'firebase/firestore'
import Swal from 'sweetalert2'
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

  const { formEnvioPage, setFormEnvioPage, carrito, oe, propietario, actualizarOrdenes } = useContext(GlobalContext)

  const sendData = async () => {
    const col = collection(db, propietario.idPropietario)

    const order = await addDoc(col, {
      ...oe,
      m3: carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))),
      total: carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))) < 1
        ? 40
        : carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))) * 40,
      articulos: carrito
    })

    Swal.fire(
      'Se realizo la orden de envío',
      `El código de la orden: ${order.id}`,
      'success'
    )

    actualizarOrdenes()
  }

  useEffect(() => {
    const height = document.querySelector('.fluxSection .test').clientHeight
    document.querySelector('.fluxSection').style.height = `${height}px`

    document.querySelectorAll('.fluxSection .test').forEach(el => {
      el.style.height = `${height}px`
      el.style.transform = `translateY(${height * formEnvioPage}px)`
    })
  }, [formEnvioPage])

  return (
    <div className="section fluxSection">
      <CarritoDeEnvio />
      <FormDireccion />
      <div className='test'>
        <div className="resumen">
          <div className='formButtons'>
            <Button onClick={() => setFormEnvioPage(0)} className={classes.buttonWhite}>
              <FontAwesomeIcon style={{ margin: '0 8px' }} icon={faArrowUp} />
              Atrás
            </Button>
          </div>
          <div>
            {carrito !== null && carrito.length > 0 ? (
              <>
                <p><span>m³ Totales: </span><span>{carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2)))} m³</span></p>
                <p><span>Dirección de envio: </span><span>{oe.direccion}</span></p>
                <p><span>Tipo de servicio: </span><span>Normal</span></p>
                <p><span>Fecha de envio: </span><span>{oe.fecha}</span></p>
                <p><span>Total a pagar: </span><span>S/.{carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))) < 1 ? 40 : carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2))) * 40}</span></p>
              </>
            ) : (
              <h1>Cargando</h1>
            )}
          </div>
          <div>
            <Button className={classes.button} onClick={sendData}>
              Finalizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEnvio