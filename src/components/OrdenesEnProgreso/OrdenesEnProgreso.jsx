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

    const { ordenesEnProgreso, buscarOrdenes } = useContext(GlobalContext)

    useEffect(() => {
        if (ordenesEnProgreso.length === 0) buscarOrdenes()
    }, [ordenesEnProgreso])

    return (
        <>
            {ordenesEnProgreso.length > 0 ? (
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
                                    <h3>Dirección: <span style={{ fontWeight: 'normal' }}>{orden.direccion}</span></h3>
                                    <h4>Fecha programada: <span style={{ fontWeight: 'normal' }}>{orden.fecha}</span></h4>
                                </AccordionSummary>
                                <AccordionDetails className='accordionDetails'>
                                    <p>Articulos de la orden:</p>
                                    <div className="accordionList">
                                        {orden.articulos.map((articulo, index) => {
                                            return (
                                                <div className='articuloCarrito' key={`articulo${index}`}>
                                                    <div className='articleImage'>
                                                        <img src={articulo.imagenRecogida} alt={articulo.titulo} />
                                                    </div>
                                                    <div className='articleInfo'>
                                                        <div>
                                                            <p className='title'>{articulo.titulo}</p>
                                                            <p className='info'>{articulo.qrCode}</p>
                                                            {/* <p className='info'>Descripcion: {articulo.descripcion}</p> */}
                                                            <p className="info">Estado: {articulo.conservacion}</p>
                                                            <p className="info">Medidas: {`${articulo.medidaLargo} x ${articulo.medidaProfundidad} x ${articulo.medidaAltura}`} metros</p>
                                                            <p className="info">Volumen: {articulo.volumen} m3</p>
                                                            <p className="info">Materiales: {articulo.material}</p>
                                                            <p className="info">Color: {articulo.color}</p>
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