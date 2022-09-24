import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleItem.css'

const ArticleItem = ({articulo}) => {
  return (
    <div className='articleItem'>
        <div className='articleImage'>
            <img src={articulo.imagenRecogida} alt={articulo.titulo}/>
        </div>
        <div className='articleInfo'>
            <p className='title'>{articulo.titulo}</p>
            <p className='info'>{articulo.qrCode}</p>
            <p className="info">Estado: {articulo.conservacion}</p>
            <p className="info">Medidas: {`${articulo.medidaLargo} x ${articulo.medidaProfundidad} x ${articulo.medidaAltura}`} metros</p>
            <p className="info">Volumen: {articulo.volumen} m3</p>
            <p className="info">Materiales: {articulo.material}</p>
            <p className="info">Color: {articulo.color}</p>
            <Link to={`/dashboard/item/${articulo.idArticulo}`} className='estado'>
              Ver detalles
            </Link>
        </div>
    </div>
  )
}

export default ArticleItem