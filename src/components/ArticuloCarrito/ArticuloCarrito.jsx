import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Checkbox, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { useContext } from 'react'
import './ArticuloCarrito.css'
import { useState } from 'react'

const useStyles = makeStyles({
    button: {
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#fff !important',
        width: '150px',
        margin: '15px 0 !important'
    },
    buttonWhite: {
        backgroundColor: '#fff !important',
        border: '1px solid #f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#f94700 !important',
        width: '150px',
        margin: '15px 0 !important'
    },
    buttonSecondary: {
        border: '1px solid #f94700 !important',
        textTransform: 'none !important',
        color: '#f94700 !important',
        width: '100%'
    },
    buttonAction: {
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#fff !important'
    }
})

const ArticuloCarrito = ({ articulo }) => {

    const classes = useStyles()

    const { actualizarEstadoEnvio, isLoading, ids, setIds, formatStrings } = useContext(GlobalContext)

    return (
        <div className='articuloCarrito'>
            <div className='articleImage'>
                <img src={articulo.imagenRecogida !== null
                    ? `https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${articulo.imagenRecogida}`
                    : 'https://pad.minem.gob.pe/Proyecta_CMS/Recursos/ProyectoImg/SinImagen.png'} alt={articulo.titulo} />
                <div className='articleOptions'>
                    <Checkbox
                        sx={{
                            '&.Mui-checked': {
                                color: '#F94700',
                            },
                        }}
                        onClick={(e) => {
                            if (e.target.checked) {
                                setIds([...ids, articulo.idArticulo])
                            } else {
                                setIds([...(ids.filter(el => el !== articulo.idArticulo))])
                            }
                        }}
                    />
                    <Button
                        onClick={() => {
                            if (!isLoading) actualizarEstadoEnvio(0, articulo.idArticulo)
                        }}
                        className={classes.button}>
                        Borrar
                    </Button>
                </div>
            </div>
            <div className='articleInfo'>
                <div>
                    <p className='title'>{formatStrings(articulo.titulo)}</p>
                    {/* <p className='info'>{articulo.qrCode}</p> */}
                    {/* <p className='info'>Descripcion: {articulo.descripcion}</p> */}
                    <p className="info">Estado: {articulo.conservacion}</p>
                    <p className="info">Medidas: {`${articulo.medidaLargo} x ${articulo.medidaProfundidad} x ${articulo.medidaAltura}`} metros</p>
                    <p className="info">Volumen: {articulo.volumen} m3</p>
                    <p className="info">Materiales: {articulo.material !== null ? formatStrings(articulo.material) : false}</p>
                    <p className="info">Color: {articulo.color !== null ? formatStrings(articulo.color) : false}</p>
                </div>

            </div>
        </div>
    )
}

export default ArticuloCarrito