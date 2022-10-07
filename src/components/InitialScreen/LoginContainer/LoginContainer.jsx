import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { withStyles, makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import './LoginContainer.css'
import '../InitialScreen.css'
import { GlobalContext } from '../../../context/GlobalStateContext'

const CssTextField = withStyles({
    root: {
        '& p':{
            textAlign: 'left',
            fontSize: '12px',
            color: '#ff5252 !important'
            },
        '& label':{
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
      fontWeight: 'bold !important'
    }
})

const LoginContainer = () => {

    const classes = useStyles()

    const {encodePetition, buscarDireccion, setUserIsTrusted, buscarPropietario, buscarArticulos} = useContext(GlobalContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [emailAction, setEmailAction] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordAction, setPasswordAction] = useState(false)

    const [credentialsError, setCredentialsError] = useState(false)

    const handleChange = (evt) =>{
      const {name, value} = evt.target

      if(name === 'email'){
        setEmail(value)
        setEmailAction(true)
      }else if(name === 'password'){
        setPassword(value)
        setPasswordAction(true)
      }
      
    }

    const verifyUser = () =>{
        let details = { email, password }
    
        fetch("http://localhost:3306/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: encodePetition(details)
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.length > 0){
              setUserIsTrusted(true)
              buscarPropietario()
              buscarDireccion()
              buscarArticulos()
              navigate('/dashboard')
            }
            else{
                setCredentialsError(true)
                setUserIsTrusted(false)
            }
          })
    }

  return (
    <div className='loginContainer initialContainer'>
        <div className='formContainer'>
            <div className='logo'>
                <img src="https://app.storange.pe/wp-content/themes/storange/app/static/images/logo.svg?key=1659564954838" alt="storange logo" />
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
                <div className='text'>Usuario incorrecto, revise el email o contraseña ingresada</div>
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
                style={{marginBottom: '16px'}}
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
                style={{marginBottom: '16px'}}
                />
                <Button
                className={classes.button}
                onClick={verifyUser}
                variant='contained'>
                    Iniciar sesión
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