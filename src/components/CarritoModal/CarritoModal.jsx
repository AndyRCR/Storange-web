import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { Button } from '@mui/material'
import { ClimbingBoxLoader } from 'react-spinners'
import ArticuloModal from '../ArticuloModal/ArticuloModal'
import './CarritoModal.css'

const CarritoModal = () => {

    const { activeModal, setActiveModal, articulos } = useContext(GlobalContext)

    return (
        <div className={activeModal ? 'carritoModal activeModal' : 'carritoModal'}>
            <div className='modalContainer'>
                <div className='buttonContainer'>
                    <div></div>
                    <h2>Agregar mas artículos</h2>
                    <FontAwesomeIcon
                    className='closeModalIcon'
                    onClick={() =>{
                        document.body.style.overflowY = "visible"
                        setActiveModal(false)
                    }}
                    icon={faXmark} />
                </div>
                <div className='articleList'>
                    {articulos !== null ? (
                        <>
                            <div className='articulosCarrito'>
                                {articulos.filter(articulo => articulo.estadoEnvio === 0).map(articulo => {
                                    return (
                                        <ArticuloModal key={articulo.idArticulo} articulo={articulo} />
                                    )
                                })}
                            </div>
                            <div className='formButtons'>
                                
                            </div>
                        </>
                    ) : (
                        <div className='loadingSpinner'>
                            <ClimbingBoxLoader size={20} color={'#F94700'} />
                            <h3>Cargando...</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarritoModal