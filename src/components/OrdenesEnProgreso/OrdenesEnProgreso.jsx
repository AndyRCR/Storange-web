import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './OrdenesEnProgreso.css'

const OrdenesEnProgreso = () => {

    const { ordenesEnProgreso, buscarOrdenes, formatStrings } = useContext(GlobalContext)

    useEffect(() => {
        if (ordenesEnProgreso === null) buscarOrdenes()
    }, [ordenesEnProgreso])

    return (
        <>
            {ordenesEnProgreso !== null && ordenesEnProgreso?.length > 0 ? (
                <div className="section accordionSection">
                    <h3 style={{ margin: '10px 0' }}>Estas son tus ordenes en progreso: </h3>
                    {ordenesEnProgreso.map((orden, i) => {
                        return (
                            <Accordion style={{ width: '100%' }} key={`orden${i}`} className='accordionItem'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ padding: '10px' }}
                                >
                                    <h3>Dirección: <span style={{ fontWeight: 'normal' }}>{orden.Direccion}</span></h3>
                                    <h4>Fecha programada: <span style={{ fontWeight: 'normal' }}>{orden.FechaSolicitado}</span></h4>
                                </AccordionSummary>
                                <AccordionDetails className='accordionDetails'>
                                    <p>Articulos de la orden:</p>
                                    <div className="accordionList">
                                        {orden.articulos.map((articulo, index) => {
                                            return (
                                                <div className='articuloCarrito' key={`articulo${index}`}>
                                                    <div className='articleImage'>
                                                        <img src={`https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${articulo.imagenRecogida}`} alt={articulo.titulo} />
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
                                        })}
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
            ) : (
                <div className="section">
                    <div className='alert'>
                        <div className='border'></div>
                        <div className='icon'>
                            <FontAwesomeIcon className='alertIcon' icon={faCircleExclamation} />
                        </div>
                        <div className='text'>No hay ordenes en progreso</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrdenesEnProgreso