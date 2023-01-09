import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalStateContext'
import './Loader.css'

const Loader = () => {

    const {loaderState, setLoaderState, change} = useContext(GlobalContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('trustedUser') === null){
            navigate('/')
        } else{
            setLoaderState(1)
            document.body.style.overflowY = "hidden"
            setTimeout(()=> {
                setLoaderState(1)
                document.body.style.overflowY = "visible"
            }, 800)
        }
    }, [change])

  return (
    <div className={`loader ${
        loaderState === 0
        ? ''
        : loaderState === 1
        ? 'first'
        : 'second'
    }`}>
        <div className="loaderImage"></div>
        <div className="progress-bar">
            <span className="bar">
            <span className="progress"></span>
            </span>
        </div>
        <p>Cargando...</p>
    </div>
  )
}

export default Loader