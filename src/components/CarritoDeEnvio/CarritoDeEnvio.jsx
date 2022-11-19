import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import { GlobalContext } from '../../context/GlobalStateContext'
import ArticuloCarrito from '../ArticuloCarrito/ArticuloCarrito'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import './CarritoDeEnvio.css'

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
    },
    buttonModal: {
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#fff !important',
        width: '200px !important',
        height: 'fit-content !important'
    }
})

const CarritoDeEnvio = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const { carrito, setFormEnvioPage, setActiveModal, actualizarEstadoEnvio, isLoading, ids, setIds } = useContext(GlobalContext)

    useEffect(() => {
    }, [carrito])

    return (
        <div className='test'>
            <div className='carritoDeEnvio articlesList'>
                {carrito !== null && carrito.length !== 0 ? (
                    <>
                        <h3>Carrito de envio</h3>
                        <div className='stepItem'>
                            <div className='step'>1</div>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Articulos seleccionados</h4>
                                <p>Esta es la lista de artículos para el envío</p>
                            </div>
                        </div>
                        <div className='articulosCarrito'>
                            {carrito.map(articulo => {
                                return (
                                    <ArticuloCarrito key={articulo.idArticulo} articulo={articulo} />
                                )
                            })}
                        </div>
                        <div className='formButtons' style={{ justifyContent: 'space-between' }}>
                            <Button
                                onClick={() => {
                                    if (!isLoading) {
                                        ids.forEach(id => actualizarEstadoEnvio(0, id))
                                        setIds([])
                                    }
                                }}
                                className={classes.buttonModal}>
                                Borrar seleccionados
                            </Button>

                            <Button
                                onClick={() => {
                                    document.querySelector('.carritoModal').style.top = `${window.scrollY}px`
                                    document.body.style.overflowY = "hidden"
                                    setActiveModal(true)
                                }}
                                className={classes.buttonModal}>
                                Agregar más articulos
                            </Button>

                            <Button
                                onClick={() => {
                                window.scrollTo(0, 0)
                                setFormEnvioPage(1)
                                }}
                                className={classes.button}>
                                <FontAwesomeIcon style={{ margin: '0 8px' }} icon={faArrowDown} />
                                Siguiente
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className='alert carritoDeEnvio'>
                        <div className='border'></div>
                        <div className='icon'>
                            <FontAwesomeIcon className='alertIcon' icon={faCircleExclamation} />
                        </div>
                        <div className='text'>No hay artículos agregados al carrito</div>
                        <Button onClick={() => {
                            document.querySelector('.carritoModal').style.top = `${window.scrollY}px`
                            document.body.style.overflowY = "hidden"
                            setActiveModal(true)
                            }} className={classes.button}>
                            Agregar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CarritoDeEnvio