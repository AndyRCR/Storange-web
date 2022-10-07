import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import CarritoDeEnvio from '../CarritoDeEnvio/CarritoDeEnvio'
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

  const { formEnvioPage, setFormEnvioPage } = useContext(GlobalContext)

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
      <div className='test'>
        <div className='formButtons'>
            <Button onClick={() => setFormEnvioPage(1)} className={classes.buttonWhite}>
              <FontAwesomeIcon style={{margin: '0 8px'}} icon={faArrowUp}/>
              Atrás
            </Button>
          </div>
        <h3>Direccion</h3>
        <div className='formButtons'>
          <Button onClick={() => setFormEnvioPage(-1)} className={classes.button}>
            <FontAwesomeIcon style={{margin: '0 8px'}} icon={faArrowDown}/>
            Siguiente
          </Button>
        </div>
      </div>
      <div className='test'>
        <div className='formButtons'>
          <Button onClick={() => setFormEnvioPage(0)} className={classes.buttonWhite}>
            <FontAwesomeIcon style={{margin: '0 8px'}} icon={faArrowUp}/>
            Atrás
          </Button>
        </div>
        <h3>Fecha</h3>
        <div></div>
      </div>
    </div>
  )
}

export default FormEnvio