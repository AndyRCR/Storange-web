import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@mui/styles'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalStateContext'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import './ArticleContainer.css'

const CssTextField = withStyles({
  root: {
    '&.MuiFormControl-root': {
      width: '100%'
    },
    '& label.Mui-focused': {
      color: '#F94700',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F94700',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black'
      },
      '&:hover fieldset': {
        borderColor: 'black'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F94700',
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#fff !important',
    width: '100px',
    margin: '15px 0 !important'
  },
  buttonSecondary: {
    border: '1px solid #f94700 !important',
    textTransform: 'none !important',
    color: '#f94700 !important',
    width: '100%'
  },
  buttonAction: {
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#fff !important'
  }
})

const ArticleContainer = () => {

  const classes = useStyles()

  const { obtenerArticulo, fotos, articulo } = useContext(GlobalContext)

  const [editTitle, setEditTitle] = useState(false)
  const [editDescription, setEditDescription] = useState(false)

  let { id } = useParams()

  useEffect(() => {
    obtenerArticulo(id)
  }, [])

  return (
    <div className='articleContainer'>
      <div className='homeButton'>
        <Link className='volver' to={'/dashboard'}>
          <FontAwesomeIcon className='volverIcon' icon={faArrowLeft}/>
          Volver
        </Link>
      </div>

      <div className='article'>
        <div className='images'>
          {fotos !== null ? (
            <ImageCarousel fotos={fotos} />
          ) : (
            <CircularProgress />
          )}
        </div>
        <div className='info'>
          {articulo !== null ? (
            <>
              <div className='titleContainer'>
                {editTitle ? (
                  <div className='titleEdit'>
                    <CssTextField
                      id="outlined-basic"
                      label="Nombre del artículo"
                      variant="outlined"
                      value={articulo.Titulo}
                    />
                    <Button
                      className={classes.button}
                      onClick={() => setEditTitle(false)}>
                      Guardar
                    </Button>
                  </div>

                ) : (
                  <div className='title'>
                    <h1>{articulo.Titulo}</h1>
                    <FontAwesomeIcon
                      className='editIcon'
                      onClick={() => setEditTitle(true)}
                      icon={faPen} />
                  </div>
                )}

              </div>
              <div className='caracteristicas'>
                <h3>Características</h3>
                <p>ID: {articulo.QRCode}</p>
                <p>Estado: {articulo.Conservacion}</p>
                <p>Medidas: {`${articulo.MedidaLargo} x ${articulo.MedidaProfundidad} x ${articulo.MedidaAltura} metros`}</p>
                <p>Volumen: {articulo.Volumen}</p>
                <p>Materiales: {articulo.Material}</p>
                <p>Color: {articulo.Color}</p>
              </div>
              <div className='descripcion'>
                <h3>Descripción Storange:</h3>
                <p>{articulo.Descripcion}</p>
              </div>
              <div className='propietario'>
                <h3>Descripcion propietario:</h3>
                {editDescription ? (
                  <div>
                    <CssTextField
                      id="outlined-basic"
                      label="Añadir una descripción"
                      variant="outlined"
                    />
                    <Button
                      className={classes.button}
                      onClick={() => setEditDescription(false)}>
                      Guardar
                    </Button>
                  </div>
                ) : (
                  <Button
                    className={classes.buttonSecondary}
                    onClick={() => setEditDescription(true)}>
                    <FontAwesomeIcon className='plusIcon' icon={faPlus}/>
                    Añadir una descripción
                  </Button>
                )}
              </div>
              <div className='gestion'>
                <h3>Gestión del artículo</h3>
                <div className='estado'>
                  Almacenado
                </div>
              </div>
              <div className='acciones'>
                <h3>Acciones</h3>
                <div className='buttons'>
                  <Button className={classes.buttonAction}>
                    Seleccionar para envío
                  </Button>
                  <div className='secondaryButtons'>
                    <Button className={classes.buttonAction}>
                      Vender
                    </Button>
                    <Button className={classes.buttonAction}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleContainer