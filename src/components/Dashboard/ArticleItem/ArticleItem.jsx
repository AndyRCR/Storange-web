import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalStateContext'
import './ArticleItem.css'

const ArticleItem = ({ articulo }) => {

  const { setChange, change, setLoaderState, formatStrings } = useContext(GlobalContext)
  const navigate = useNavigate()

  return (
    <div className='articleItem'>
      <div className='articleImage'>
        <img src={articulo.imagenRecogida !== null
          ? `https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${articulo.imagenRecogida}`
          : 'https://pad.minem.gob.pe/Proyecta_CMS/Recursos/ProyectoImg/SinImagen.png'} alt={articulo.titulo} />
      </div>
      <div className='articleInfo'>
        <div>
          <p className='title'>{formatStrings(articulo.titulo)}</p>
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
            window.scrollTo(0, 0)
            setChange(!change)
            setLoaderState(0)
            setTimeout(() => navigate(`/dashboard/item/${articulo.idArticulo}`), 500)
          }}
          className='estado'>
          Ver detalles
        </div>
      </div>
    </div>
  )
}

export default ArticleItem