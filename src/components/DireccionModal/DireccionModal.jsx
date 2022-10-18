import React from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import Places from '../Places/Places'
import './DireccionModal.css'

const DireccionModal = () => {

    const { activeDireccionModal, setActiveDireccionModal } = useContext(GlobalContext)

    return (
        <div className={activeDireccionModal ? 'direccionModal activeModal' : 'direccionModal'}>
            <div className='modalContainer'>
                <div className='buttonContainer'>
                    <div></div>
                    <h2>Nueva dirección</h2>
                    <FontAwesomeIcon
                        className='closeModalIcon'
                        onClick={() => {
                            document.body.style.overflowY = "visible"
                            setActiveDireccionModal(false)
                        }}
                        icon={faXmark} />
                </div>
                <div className='direccionContainer'>
                    <Places/>
                </div>
            </div>
        </div>
    )
}

export default DireccionModal