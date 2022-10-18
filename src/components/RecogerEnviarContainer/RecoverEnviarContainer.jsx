import { Button, MenuItem, Select, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { withStyles, makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { ToastContainer } from 'react-toastify'
import FormEnvio from '../FormEnvio/FormEnvio'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './RecogerEnviar.css'
import OrdenesEnProgreso from '../OrdenesEnProgreso/OrdenesEnProgreso'

const CssTextField = withStyles({
    root: {
        '&.MuiFormControl-root': {
            width: '100%',
            height: '200px'
        },
        '& label.Mui-focused': {
            color: '#F94700',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F94700',
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                height: '200px'
            },
            '& textarea': {
                height: '200px'
            },
            '& fieldset': {
                borderColor: 'black',
                height: '200px'
            },
            '&:hover fieldset': {
                borderColor: 'black'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F94700',
            },
        }
    }
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
    buttonWhite: {
        backgroundColor: '#fff !important',
        border: '1px solid #f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#f94700 !important',
        width: '150px !important',
        margin: '30px 20px !important'
    },
    buttonSecondary: {
        border: '1px solid #f94700 !important',
        textTransform: 'none !important',
        color: '#f94700 !important',
        width: '100% !important'
    },
    buttonBorder: {
        textTransform: 'none !important',
        color: '#383838 !important',
        width: 'calc(100% / 3)',
        backgroundColor: '#F1F1F1 !important',
        fontWeight: 'bold !important',
        borderRadius: '4px 4px 0 0 !important'
    },
    buttonBorderActive: {
        color: '#fff !important',
        fontWeight: 'bold !important',
        backgroundColor: '#f94700 !important',
        borderRadius: '4px 4px 0 0 !important'
    },
    root: {
        '&': {
            fontFamily: "'Poppins', sans-serif !important",
            color: '#757575 !important',
            fontSize: '14px !important'
        },
        '& .MuiSelect-select': {
            paddingLeft: '0 !important'
        },
        "&.Mui-focused": {
            border: "2px solid #f94700 !important"
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid black !important"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none !important"
        }
    }
})

const isWeekend = (date) => {
    const day = date.day()
    return day === 0 || day === 6
}

const RecoverEnviarContainer = () => {

    const classes = useStyles()
    const { direcciones, setActiveDireccionModal, buscarDireccion, buscarArticulos, articulos } = useContext(GlobalContext)

    const [buttonState, setButtonState] = useState([true, false, false])
    const [value, setValue] = useState(dayjs('2022-04-07'))
    const [direccionSelect, setDireccionSelect] = useState("default")

    useEffect(() => {
        if(direcciones === null) buscarDireccion()
        if(articulos === null) buscarArticulos()

        const width = document.querySelector('.navbarRecoger').clientWidth

        document.querySelectorAll('.sectionRecoger .section').forEach(el => {
            el.style.transform = `translateX(-${width * buttonState.indexOf(true)}px)`
        })
    }, [buttonState])


    return (
        <div className='recogerEnviarContainer'>
            <div className='navbarRecoger'>
                <Button onClick={() => setButtonState([true, false, false])} className={buttonState[0] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Carrito de envío</Button>
                <Button onClick={() => setButtonState([false, true, false])} className={buttonState[1] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Ordenes en progreso</Button>
                <Button onClick={() => setButtonState([false, false, true])} className={buttonState[2] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Solicitar recogida</Button>
            </div>
            <div className='sectionRecoger'>
                <FormEnvio />
                <OrdenesEnProgreso />
                <div className="section">
                    {/* <div className='formRecogida'>
                        <div className="form">
                            <div className="subform">
                                <h3>Formulario de Recogida</h3>
                                <div className="formItem">
                                    <p>¿Qué artículos necesitas que recojamos?</p>
                                    <CssTextField
                                        id="outlined-basic"
                                        label="Describe los artículos"
                                        variant="outlined"
                                        multiline
                                    />
                                </div>
                                <div className="formItem">
                                    <p>Seleccione la dirección de envío</p>
                                    {direcciones !== null ? (
                                        <>
                                            <Select
                                                name='direccion'
                                                className={`customSelect ${classes.root}`}
                                                value={direccionSelect}
                                                onChange={ e => setDireccionSelect(e.target.value)}
                                            >
                                                <MenuItem value="default">Seleccione su dirección</MenuItem>
                                                {direcciones.map((dir, index) =>{
                                                    return (
                                                        <MenuItem key={`direccion${index}`} value={dir.direccion}>{dir.direccion}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            <Button
                                            onClick={() => {
                                                document.body.style.overflowY = "hidden"
                                                setActiveDireccionModal(true)
                                            }}
                                            className={classes.button}>
                                                Agregar nueva dirección
                                            </Button>
                                        </>
                                    ):(
                                        <>Cargando</>
                                    )}
                                </div>
                            </div>
                            <div className="subform">
                                <div>
                                    <p>¿Qué día te gustaría que pasemos por tus cosas?</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={value}
                                            shouldDisableDate={isWeekend}
                                            onChange={(newValue) => {
                                                setValue(newValue)
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button className={classes.buttonWhite}>
                                Limpiar
                            </Button>
                            <Button className={classes.button}>
                                Solicitar
                            </Button>
                        </div>
                    </div> */}
                    <div className='alert'>
                        <div className='border'></div>
                        <div className='icon'>
                            <FontAwesomeIcon className='alertIcon' icon={faCircleExclamation} />
                        </div>
                        <div className='text'>Para solicitar una recogida de artículos, comunicarse por WhatsApp con el número 951612957</div>
                    </div>
                </div>
            </div>
            <div className='footerRecoger'>
                Cualquier duda o consulta por favor comuníquese con nuestra área de atención al cliente por WhatsApp al teléfono 951612957
            </div>
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

export default RecoverEnviarContainer