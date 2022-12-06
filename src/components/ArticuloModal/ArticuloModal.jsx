import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './ArticuloModal.css'

const ArticuloModal = ({ articulo }) => {

    const { actualizarEstadoEnvio, isLoading, setFormEnvioPage, formatStrings } = useContext(GlobalContext)

    return (
        <div className='articuloModal'>
            <div className='articleImage'>
                <img
                src={articulo.imagenRecogida !== null
                    ? `https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${articulo.imagenRecogida}`
                    : 'https://pad.minem.gob.pe/Proyecta_CMS/Recursos/ProyectoImg/SinImagen.png'}
                alt={articulo.titulo} />
            </div>
            <div className='articleInfo'>
                <p className='title'>{formatStrings(articulo.titulo)}</p>
                <div>
                    {/* <p className='info'>{articulo.qrCode}</p> */}
                    <p className='info'>Estado articulo: {articulo.estadoArticulo}</p>
                    <p className='info'>Tipo articulo: {articulo.tipoArticulo}</p>
                    {/* <p className="info">Estado: {articulo.conservacion}</p> */}
                    <p className="info">Medidas: {`${articulo.medidaLargo} x ${articulo.medidaProfundidad} x ${articulo.medidaAltura}`} metros</p>
                    <p className="info">Volumen: {articulo.volumen} m3</p>
                    <p className="info">Materiales: {articulo.material !== null ? formatStrings(articulo.material) : false}</p>
                    <p className="info">Color: {articulo.color !== null ? formatStrings(articulo.color) : false}</p>
                </div>
                <div
                    onClick={() => {
                        if (!isLoading) actualizarEstadoEnvio(1, articulo.idArticulo)
                        setFormEnvioPage(2)
                    }}
                    className='estado'>
                    Agregar al carrito
                </div>
            </div>
        </div>
    )
}

export default ArticuloModal