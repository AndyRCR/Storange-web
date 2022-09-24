import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import './ImageCarousel.css'

const ImageCarousel = ({ fotos }) => {

  const [position, setPosition] = useState(0)

  const moveLeft = () => {
    setPosition(position + 1 > fotos.length-1 ? 0 : position + 1)
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${420 * position}px)`
    })
  }

  const moveRight = () => {
    setPosition(position - 1 < 0 ? fotos.length-1 : position - 1)
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${420 * position}px)`
    })
  }

  useEffect(() => {
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${420 * position}px)`
    })
  }, [position])

  return (
    <div className='imageCarousel'>
      <div className="container">
        <button className="prev" onClick={moveRight}>
          <FontAwesomeIcon icon={faAngleLeft}/>          
        </button>
        <button className="next" onClick={moveLeft}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
        <div className="inner-container">
          {fotos.map((foto,index) => {
            return (
              <div className="card" key={`foto ${index}`}>
                <img src={foto.enlaceRef} alt={foto.enlaceRef} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel