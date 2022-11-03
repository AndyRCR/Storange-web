import { faCirclePlus, faFaceLaugh, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalStateContext'
import './SecondaryNavbar.css'

const SecondaryNavbar = () => {

    const {setChange, change, setLoaderState, setOe, oe, setDireccionSelect, setFormEnvioPage, carrito } = useContext(GlobalContext)

    const navigate = useNavigate()

    return (
        <div className='secondaryNavbar'>
            <div
                className={'navLink'}
                onClick={() => {
                    window.scrollTo(0, 0)
                    setChange(!change)
                    setLoaderState(0)
                    setTimeout(() => {
                        navigate('/pickup_send')
                        setOe({
                            ...oe,
                            direccion: ''
                        })
                        setDireccionSelect('default')
                        setFormEnvioPage(1.5)
                    }, 500)
                }}
            >
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                    <FontAwesomeIcon className='menuIcon' icon={faTruckFast} />
                    {carrito !== null ? (
                        <div className='indicator'>
                            {carrito.length}
                        </div>
                    ) : false}
                </div>
                <div style={{fontSize: '12px'}}>Recoger/Enviar</div>
            </div>

            <div
                className={'navLink'}
                onClick={() => {
                    window.scrollTo(0, 0)
                    setChange(!change)
                    setLoaderState(0)
                    setTimeout(() => navigate('/dashboard'), 500)
                }}
            >
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                    <FontAwesomeIcon className='menuIcon' icon={faCirclePlus} />
                </div>
                <div style={{fontSize: '12px'}}>Mis articulos</div>
            </div>

            <div
                className={'navLink'}
                onClick={() => {
                    window.scrollTo(0, 0)
                    setChange(!change)
                    setLoaderState(0)
                    setTimeout(() => navigate('/perfil'), 500)
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                    <FontAwesomeIcon className='menuIcon' icon={faFaceLaugh} />
                </div>
                <div style={{fontSize: '12px'}}>Perfil</div>
            </div>
        </div>
    )
}

export default SecondaryNavbar