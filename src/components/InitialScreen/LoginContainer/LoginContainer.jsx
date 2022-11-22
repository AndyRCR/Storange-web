import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button, CircularProgress } from '@mui/material'
import { withStyles, makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../../context/GlobalStateContext'
import ReCAPTCHA from 'react-google-recaptcha'
import './LoginContainer.css'
import '../InitialScreen.css'
import Swal from 'sweetalert2'
import { text } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'

const CssTextField = withStyles({
  root: {
    '& p': {
      textAlign: 'left',
      fontSize: '12px',
      color: '#ff5252 !important'
    },
    '& label': {
      fontSize: '16px'
    },
    '& label.Mui-focused': {
      color: '#ff5252 !important',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #000 !important'
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid #ff5252 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black'
      },
      '&:hover fieldset': {
        borderColor: 'black'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff5252 !important'
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    width: '250px !important'
  }
})

const LoginContainer = () => {

  const classes = useStyles()

  const { encodePetition, setUserIsTrusted, setIdPropietario, setIsLoading, isLoading, setSwalCambio } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [emailAction, setEmailAction] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordAction, setPasswordAction] = useState(false)

  const [captchaState, setCaptchaState] = useState(-1)
  const [captchaValue, setCaptchaValue] = useState(null)

  const [credentialsError, setCredentialsError] = useState(false)

  const [error, setError] = useState('Usuario incorrecto, revise el email o contraseña ingresada')

  const handleChange = (evt) => {
    const { name, value } = evt.target

    if (name === 'email') {
      setEmail(value)
      setEmailAction(true)
    } else if (name === 'password') {
      setPassword(value)
      setPasswordAction(true)
    }

  }

  const verifyCaptcha = () => {
    if (captchaState == 1) verifyExistence()
    else setCaptchaState(captchaValue !== null)
  }

  const verifyUser = () => {
    let details = { email, password }

    setIsLoading(true)

    fetch("https://api.storange.pe/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setUserIsTrusted(true)
          setSwalCambio(true)
          navigate('/dashboard')
          setIdPropietario(res[0].idPropietario)
          localStorage.setItem('trustedUser', res[0].idPropietario)
        }
        else {
          setError('Usuario incorrecto, revise el email o contraseña ingresada')
          setCredentialsError(true)
          setUserIsTrusted(false)
        }
      })
      .catch(() =>{
        Swal.fire({
          title: 'Ups! Ocurrió un error con el servidor',
          text: 'Intente nuevamente en unos momentos',
          icon: 'error'
        })
      })
      .finally(() => setIsLoading(false))
  }

  const createUser = (newUser) =>{
    fetch("https://api.storange.pe/crearUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(newUser)
    }).then( () => verifyUser())
  }

  const verifyExistence = () =>{
    let details = { email }

    fetch("https://api.storange.pe/verificarUsuarioExistente", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    }).then( res => res.json())
    .then(data => {
      if(data.length > 0){
        data[0].uIdPropietario === null
        ? createUser({
          idPropietario: data[0].pIdPropietario,
          email: data[0].email,
          documento: data[0].documento
        })
        : verifyUser()
      }else{
        setError('El correo ingresado no se encuentra entre nuestros registros')
        setCredentialsError(true)
      }
    })
  }

  useEffect(() => {
    alert('Safari v4')
  }, [])

  return (
    <div className='loginContainer initialContainer'>
      <div className='formContainer'>
        <div className='logo' style={{ padding: '30px' }}>
          <img src="https://storange-images.s3.amazonaws.com/img/storangelogo.png" alt="storange logo" />
        </div>
        <div className="title">
          <h1>Bienvenido de nuevo</h1>
          <p>Escribe tus credenciales</p>
        </div>
        <div className={credentialsError ? 'alert' : 'alert visible'}>
          <div className='border'></div>
          <div className='icon'>
            <FontAwesomeIcon className='alertIcon' icon={faTriangleExclamation} />
          </div>
          <div className='text'>{error}</div>
        </div>
        <div className="form">
          <CssTextField
            type={'email'}
            label="Email"
            variant="standard"
            name="email"
            onChange={handleChange}
            onBlur={handleChange}
            error={email === '' && emailAction}
            helperText={email === '' && emailAction ? 'Email requerido' : ' '}
            value={email}
            style={{ marginBottom: '16px', width: '100%' }}
          />
          <CssTextField
            type={'password'}
            label="Contraseña"
            variant="standard"
            name="password"
            onChange={handleChange}
            onBlur={handleChange}
            error={password === '' && passwordAction}
            helperText={password === '' && passwordAction ? 'Contraseña requerida' : ' '}
            value={password}
            style={{ marginBottom: '16px', width: '100%' }}
          />
          <div className='recaptcha'>
            <ReCAPTCHA
              style={{ display: 'inline-block' }}
              sitekey='6LdGppQiAAAAAJEMB6uI6ZrC55gd37BVIym7yjxN'
              onChange={(e) => {
                setCaptchaValue(e)
                setCaptchaState(e === null ? 0 : 1)
              }} />
            <p className={captchaState ? 'errorLabel' : 'errorLabel visible'}>
              Se necesita verificación
            </p>
          </div>
          <Button
            className={classes.button}
            onClick={verifyCaptcha}
            variant='contained'>
            {isLoading ? <CircularProgress style={{width: '20px', height: '20px', color:'#fff'}}/> : 'Iniciar sesión'}
          </Button>
        </div>
        <div className='options'>
          <Link to={'/recovery'}>Recuperar contraseña</Link>
          <div>|</div>
          <Link to={'/register'}>Regístrate</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginContainer