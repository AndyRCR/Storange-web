import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalStateContext'
import './ArticleItem.css'

const ArticleItem = ({articulo}) => {

  const { setChange, change, setLoaderState } = useContext(GlobalContext)
  const navigate = useNavigate()
  
  return (
    <div className='articleItem'>
        <div className='articleImage'>
            <img src={articulo.imagenRecogida !== null ? articulo.imagenRecogida : 'http://pad.minem.gob.pe/Proyecta_CMS/Recursos/ProyectoImg/SinImagen.png'} alt={articulo.titulo}/>
        </div>
        <div className='articleInfo'>
            <p className='title'>{articulo.titulo}</p>
            {/* <p className='info'>{articulo.qrCode}</p> */}
            <p className='info'>Estado articulo: {articulo.estadoArticulo}</p>
            <p className='info'>Tipo articulo: {articulo.tipoArticulo}</p>
            {/* <p className="info">Estado: {articulo.conservacion}</p> */}
            <p className="info">Medidas: {`${articulo.medidaLargo} x ${articulo.medidaProfundidad} x ${articulo.medidaAltura}`} metros</p>
            <p className="info">Volumen: {articulo.volumen} m3</p>
            <p className="info">Materiales: {articulo.material}</p>
            <p className="info">Color: {articulo.color}</p>
            <div
            onClick={() => {
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