import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMapLocationDot, faMapPin, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'
import './PerfilContainer.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { ToastContainer } from 'react-toastify'

const CssTextField = withStyles({
  root: {
    '& p': {
      textAlign: 'left',
      fontSize: '12px',
      color: '#F94700 !important'
    },
    '& label': {
      fontSize: '16px'
    },
    '& label.Mui-focused': {
      color: '#F94700 !important',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #000 !important'
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid #F94700 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black'
      },
      '&:hover fieldset': {
        borderColor: 'black'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F94700 !important'
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
    width: '200px !important',
    margin: '20px 0 !important',
    height: 'fit-content !important'
  },
  buttonDireccion: {
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#fff !important',
    width: '100% !important',
    margin: '20px 0 !important',
    height: 'fit-content !important'
  }
})

const regex = /^(?=\w*\d)(?=\w*[a-z])(?=\w*[a-z])\S{8,16}$/

const PerfilContainer = () => {

  const classes = useStyles()

  const { propietario, buscarPropietario, setIsLoading, encodePetition, direcciones, setActiveDireccionModal, buscarDireccion, borrarDireccion } = useContext(GlobalContext)

  const [section, setSection] = useState(1)

  const [name, setName] = useState('')
  const [nameAction, setNameAction] = useState(false)

  const [apellido, setApellido] = useState('')
  const [apellidoAction, setApellidoAction] = useState(false)

  const [email, setEmail] = useState('')
  const [emailAction, setEmailAction] = useState(false)

  const [phone, setPhone] = useState('')
  const [phoneAction, setPhoneAction] = useState(false)

  const [pass, setPass] = useState('')

  const [newPass, setNewPass] = useState('')
  const [newPassAction, setNewPassAction] = useState(false)

  const [newPassConfirm, setNewPassConfirm] = useState('')

  const handleChange = (evt) => {
    const { name, value } = evt.target

    if (name === 'name') {
      setName(value)
      setNameAction(true)
    } else if (name === 'apellido') {
      setApellido(value)
      setApellidoAction(true)
    } else if (name === 'email') {
      setEmail(value)
      setEmailAction(true)
    } else if (name === 'phone') {
      setPhone(value)
      setPhoneAction(true)
    } else if (name === 'pass') {
      setPass(value)
    } else if (name === 'newPass') {
      setNewPass(value)
      setNewPassAction(true)
    } else {
      setNewPassConfirm(value)
    }
  }

  const actualizarInfo = () => {
    let details = {
      idPropietario: propietario.idPropietario,
      name: name === '' ? propietario.nombre : name,
      apellido: apellido === '' ? propietario.apellido : apellido,
      email: email === '' ? propietario.email : email,
      phone: phone === '' ? propietario.telefono : phone
    }

    if (
      ((propietario !== null && !nameAction) || name !== '') &&
      ((propietario !== null && !apellidoAction) || apellido !== '') &&
      ((propietario !== null && !emailAction) || email !== '') &&
      ((propietario !== null && !phoneAction) || phone !== '')
    ) {
      setIsLoading(true)
      fetch("https://api.storange.website/actualizarPropietario", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: encodePetition(details)
      })
        .then(() => {
          setIsLoading(false)
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Los datos fueron actualizados',
            icon: 'success'
          })
        })
    } else {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        text: 'Intente nuevamente',
        icon: 'info'
      })
    }

  }

  const actualizarContraseña = () => {
    if (newPass === newPassConfirm && newPass.length > 6) {
      let details = { idPropietario: propietario.idPropietario, pass: newPass }

      fetch("https://api.storange.website/actualizarContrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: encodePetition(details)
      })
        .then(() => {
          setIsLoading(false)
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Los datos fueron actualizados',
            icon: 'success'
          })
          setPass('')
          setNewPass('')
          setNewPassConfirm('')
          setNewPassAction(false)
        })
    } else {
      Swal.fire({
        title: 'Confirmación',
        text: 'Las contraseñas deben coincidir y tener entre 8 a 16 carácteres alfanuméricos',
        icon: 'info'
      })
    }
  }

  const verificarContraseña = () => {
    let details = { email: propietario.email, password: pass }

    setIsLoading(true)
    fetch("https://api.storange.website/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          actualizarContraseña()
          if (propietario.primerCambio === 0) {
            fetch("https://api.storange.website/actualizarPrimerCambio", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              },
              body: encodePetition({idPropietario: propietario.idPropietario})
            })
          }
        }
        else {
          setIsLoading(false)
          Swal.fire({
            title: 'Contraseña incorrecta',
            text: 'Intente nuevamente',
            icon: 'error'
          })
        }
      })
  }

  useEffect(() => {
    buscarPropietario()
    buscarDireccion()
  }, [propietario])


  return (
    <div className='perfilContainer'>
      <div className='menuPerfil'>
        <p>Configuración de la cuenta</p>
        <div className={section === 1 ? 'menuItem menuItemActive' : 'menuItem'} onClick={() => setSection(1)}>
          <FontAwesomeIcon className='menuIcon' icon={faUser} />
          Información personal privada
        </div>
        <div className={section === 2 ? 'menuItem menuItemActive' : 'menuItem'} onClick={() => setSection(2)}>
          <FontAwesomeIcon className='menuIcon' icon={faMapLocationDot} />
          Direcciones
        </div>
      </div>
      {section === 1 ? (
        <div className='menuInfo'>
          <div className='menuArea'>
            <div className='menuHeader'>
              <h2>Información Personal Privada</h2>
            </div>
            {propietario !== null ? (
              <div className='menuInputs'>
                <CssTextField
                  label="Nombres"
                  variant="outlined"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={name === '' && nameAction}
                  helperText={name === '' && nameAction ? 'Nombre requerido' : ' '}
                  value={propietario.nombre && !nameAction ? propietario.nombre : name}
                  style={{ marginBottom: '16px' }}
                />
                <CssTextField
                  label="Apellidos"
                  variant="outlined"
                  name="apellido"
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={apellido === '' && apellidoAction}
                  helperText={apellido === '' && apellidoAction ? 'Apellidos requeridos' : ' '}
                  value={propietario.apellido && !apellidoAction ? propietario.apellido : apellido}
                  style={{ marginBottom: '16px' }}
                />
                <CssTextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={email === '' && emailAction}
                  helperText={email === '' && emailAction ? 'Email requerido' : ' '}
                  value={propietario.email && !emailAction ? propietario.email : email}
                  style={{ marginBottom: '16px' }}
                />
                <CssTextField
                  label="Teléfono"
                  variant="outlined"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={phone === '' && phoneAction}
                  helperText={phone === '' && phoneAction ? 'Teléfono requerido' : ' '}
                  value={propietario.telefono && !phoneAction ? propietario.telefono : phone}
                  style={{ marginBottom: '16px' }}
                />
              </div>
            ) : (
              <h1>Cargando...</h1>
            )}
            <div className='menuFooter'>
              <Button
                className={classes.button}
                onClick={actualizarInfo}
              >Guardar</Button>
            </div>
          </div>
          <div className='menuArea'>
            <div className='menuHeader'>
              <h2>Cambiar Contraseña</h2>
            </div>
            <div className='menuInputs'>
              <CssTextField
                type={'password'}
                label="Contraseña actual"
                variant="outlined"
                name="pass"
                onChange={handleChange}
                onBlur={handleChange}
                helperText={' '}
                value={pass}
                style={{ marginBottom: '16px' }}
              />
              <CssTextField
                type={'password'}
                label="Nueva contraseña"
                variant="outlined"
                name="newPass"
                onChange={handleChange}
                onBlur={handleChange}
                error={regex.test(newPass) === false && newPassAction}
                helperText={regex.test(newPass) === false && newPassAction ? 'De 8 a 16 carácteres entre números y letras' : ' '}
                value={newPass}
                style={{ marginBottom: '16px' }}
              />
              <CssTextField
                type={'password'}
                label="Confirmar contraseña"
                variant="outlined"
                name="newPassConfirm"
                onChange={handleChange}
                onBlur={handleChange}
                error={newPassConfirm !== newPass}
                helperText={newPassConfirm !== newPass ? 'Las contraseñas no coinciden' : ' '}
                value={newPassConfirm}
                style={{ marginBottom: '16px' }}
              />
            </div>
            <div className='menuFooter'>
              <Button
                onClick={verificarContraseña}
                className={classes.button}>Guardar</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='menuDireccion'>
          <div className='menuArea'>
            <div className="menuHeader">
              <h2>Direcciones</h2>
            </div>
            <p>Agrega o escoge una dirección como principal</p>
            <Button
              onClick={() => {
                document.body.style.overflowY = "hidden"
                setActiveDireccionModal(true)
              }}
              className={classes.buttonDireccion}
            >
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faLocationDot} />
              Agregar nueva dirección
            </Button>
            {direcciones !== null ? (
              direcciones.map((dir, i) => {
                return (
                  <div key={`direccion${i}`} className='direccionItem'>
                    <div>
                      <FontAwesomeIcon style={{ marginRight: '30px', fontSize: '25px' }} icon={faMapPin} />
                      <p>{dir.direccion}</p>
                    </div>
                    <FontAwesomeIcon
                      style={{ marginLeft: '30px', fontSize: '18px', color: 'red', cursor: 'pointer' }}
                      icon={faTrash}
                      onClick={() => borrarDireccion(dir.idDireccion)} />
                  </div>
                )
              })
            ) : (
              <h1>Cargando</h1>
            )}
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        theme='light'
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  )
}

export default PerfilContainer