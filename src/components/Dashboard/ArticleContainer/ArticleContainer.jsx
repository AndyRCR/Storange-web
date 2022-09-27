import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@mui/styles'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalStateContext'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import { ClimbingBoxLoader } from 'react-spinners'
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
    width: '150px',
    margin: '15px 0 !important'
  },
  buttonWhite: {
    backgroundColor: '#fff !important',
    border: '1px solid #f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#f94700 !important',
    width: '150px',
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

  const { obtenerArticulo, fotos, articulo, actualizarTitulo, actualizarDescripcion, isLoading } = useContext(GlobalContext)

  const [editTitle, setEditTitle] = useState(false)
  const [editDescription, setEditDescription] = useState(false)

  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  let { id } = useParams()

  useEffect(() => {
    obtenerArticulo(id)
  }, [])

  return (
    <div className='articleContainer'>
      <div className='homeButton'>
        <Link className='volver' to={'/dashboard'}>
          <FontAwesomeIcon className='volverIcon' icon={faArrowLeft} />
          Volver
        </Link>
      </div>

      <div className='article'>
        {fotos !== null && articulo !== null ? (
          <>
            <div className='images'>
              <ImageCarousel fotos={fotos} />
            </div>
            <div className="info">
              <div className='titleContainer'>
                {editTitle ? (
                  <div className='titleEdit'>
                    <CssTextField
                      id="outlined-basic"
                      label="Nombre del artículo"
                      variant="outlined"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <div className='buttonsEdit'>
                      <Button
                        className={classes.buttonWhite}
                        onClick={() => setEditTitle(false)}>
                        Cancelar
                      </Button>
                      <Button
                        className={classes.button}
                        onClick={() => {
                          if (!isLoading) actualizarTitulo(newTitle, setEditTitle)
                        }}>
                        {isLoading ? <CircularProgress style={{ color: '#fff', width: '20px', height: '20px' }} /> : 'Guardar'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='title'>
                    <h1>{articulo.Titulo}</h1>
                    <FontAwesomeIcon
                      className='editIcon'
                      onClick={() => {
                        setNewTitle(articulo.Titulo)
                        setEditTitle(true)
                      }}
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
                {articulo.descripcionPropietario === null || editDescription ? (
                  <>
                    {editDescription ? (
                      <div>
                        <CssTextField
                          id="outlined-basic"
                          label="Añadir una descripción"
                          variant="outlined"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <div className='buttonsEdit'>
                          <Button
                            className={classes.buttonWhite}
                            onClick={() => setEditDescription(false)}>
                            Cancelar
                          </Button>
                          <Button
                            className={classes.button}
                            onClick={() => {
                              if (!isLoading) actualizarDescripcion(newDescription, setEditDescription)
                            }}>
                            {isLoading ? <CircularProgress style={{ color: '#fff', width: '20px', height: '20px' }} /> : 'Guardar'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        className={classes.buttonSecondary}
                        onClick={() => {
                          setNewDescription(articulo.descripcionPropietario === null ? '' : articulo.descripcionPropietario)
                          setEditDescription(true)
                        }}>
                        <FontAwesomeIcon className='plusIcon' icon={faPlus} />
                        Añadir una descripción
                      </Button>
                    )}
                  </>
                ) : (
                  <div className='descripcionPropietario'>
                    <p>{articulo.descripcionPropietario}</p>
                    <FontAwesomeIcon
                      className='editIcon'
                      onClick={() => {
                        setNewDescription(articulo.descripcionPropietario === null ? '' : articulo.descripcionPropietario)
                        setEditDescription(true)
                      }}
                      icon={faPen} />
                  </div>
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
            </div>
          </>
        ) : (
          <div className='loadingSpinner'>
            <ClimbingBoxLoader size={20} color={'#F94700'} />
            <h3>Cargando...</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleContainer