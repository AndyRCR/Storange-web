import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { Button, Pagination } from '@mui/material'
import { ClimbingBoxLoader } from 'react-spinners'
import ArticuloModal from '../ArticuloModal/ArticuloModal'
import { makeStyles } from '@mui/styles'
import './CarritoModal.css'

const useStyles = makeStyles({
    root: {
        '&':{
            marginTop: '20px'
        },
        '& ul > li:not(:first-child):not(:last-child) > button.Mui-selected': {
            backgroundColor: '#F94700',
            color: '#fff',
            fontWeight: 'bold'
        },
        '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
            fontWeight: 'bold'
        }
    }
})

const CarritoModal = () => {

    const classes = useStyles()

    const { activeModal, setActiveModal, articulos } = useContext(GlobalContext)

    const [page, setPage] = useState(1)

    return (
        <div className={activeModal ? 'carritoModal activeModal' : 'carritoModal'}>
            <div className='modalContainer'>
                <div className='buttonContainer'>
                    <div></div>
                    <h2>Agregar mas artículos</h2>
                    <FontAwesomeIcon
                        className='closeModalIcon'
                        onClick={() => {
                            document.body.style.overflowY = "visible"
                            setActiveModal(false)
                        }}
                        icon={faXmark} />
                </div>
                <div className='articleList'>
                    {articulos !== null ? (
                        <>
                            <div className='articulosCarrito'>
                                {[...articulos].filter(articulo => {return articulo.estadoEnvio === 0 && articulo.idEstadoArticulo !== 3}).slice((page-1)*10, (page-1)*10+10).map(articulo => {
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
                <div className="articlesPagination">
                {articulos !== null ? (
                    <Pagination
                        showFirstButton
                        showLastButton
                        className={classes.root}
                        page={page}
                        onChange={(e, pageNumber) => setPage(pageNumber)}
                        count={Math.round([...articulos].filter(articulo => {return articulo.estadoEnvio === 0 && articulo.idEstadoArticulo !== 3}).length / 10)}
                        shape="rounded" />
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