import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import './ImageCarousel.css'

const ImageCarousel = ({ fotos, fotoRecogida }) => {

  const [position, setPosition] = useState(0)

  const moveLeft = () => {
    setPosition(position + 1 > fotos.length - 1 + 1 ? 0 : position + 1)
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${document.querySelector('.card').offsetWidth * position}px)`
    })
  }

  const moveRight = () => {
    setPosition(position - 1 < 0 ? fotos.length - 1 + 1 : position - 1)
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${document.querySelector('.card').offsetWidth * position}px)`
    })
  }

  useEffect(() => {
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateX(-${document.querySelector('.card').offsetWidth * position}px)`
    })

    let textos = document.querySelectorAll('.card > div > div >div >span')

    Array.from(textos).forEach(el =>{
      el.innerText = 'Acerque el cursor para hacer zoom'
    })

  }, [position])

  return (
    <div className='imageCarousel'>
      <div className="container">
        <button className="prev" onClick={moveRight}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className="next" onClick={moveLeft}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <div className="inner-container">
          {[{ enlaceRef: fotoRecogida }, ...fotos].map((foto, index) => {
            return (
              <div className="card" key={`foto ${index}`}>
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: foto.enlaceRef,
                    isFluidWidth: true,
                    src: `https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${foto.enlaceRef}`,
                    width: 1200,
                    height: 1800,
                  },
                  largeImage: {
                    src: `https://storange-images.s3.amazonaws.com/appsheet/data/StorangeGestionLogistica_5361150/${foto.enlaceRef}`,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerStyle: {
                    borderRadius: '20px',
                  },
                  isHintEnabled: true,
                  // shouldHideHintAfterFirstActivation: false,
                  enlargedImagePosition: 'over'
                }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel