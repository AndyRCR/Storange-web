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
import './RecogerEnviar.css'

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
        width: '150px !important',
        margin: '0 20px !important',
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
        borderRadius: '0 !important',
        color: '#383838 !important',
        width: 'calc(100% / 3)'
    },
    buttonBorderActive: {
        color: '#f94700 !important',
        borderBottom: '2px solid #f94700 !important'
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

    const [buttonState, setButtonState] = useState([true, false, false])
    const [value, setValue] = useState(dayjs('2022-04-07'))

    const pixelToInt = (pixels) => {
        return parseInt(pixels.slice(0, pixels.indexOf('p')))
    }

    useEffect(() => {
        const style = window.getComputedStyle(document.querySelector('.sectionRecoger .section'))
        const width = style.getPropertyValue('width')

        document.querySelectorAll('.sectionRecoger .section').forEach(el => {
            el.style.transform = `translateX(-${pixelToInt(width) * buttonState.indexOf(true)}px)`
        })
        return () => {
        }
    }, [buttonState])


    return (
        <div className='recogerEnviarContainer'>
            <div className='navbarRecoger'>
                <Button onClick={() => setButtonState([true, false, false])} className={buttonState[0] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Solicitar recogida</Button>
                <Button onClick={() => setButtonState([false, true, false])} className={buttonState[1] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Carrito de envío</Button>
                <Button onClick={() => setButtonState([false, false, true])} className={buttonState[2] ? `${classes.buttonBorder} ${classes.buttonBorderActive}` : classes.buttonBorder}>Ordenes en progreso</Button>
            </div>
            <div className='sectionRecoger'>
                <div className="section">
                    <div className='formRecogida'>
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
                                    <Select
                                        name='direccion'
                                        className={`customSelect ${classes.root}`}
                                    >
                                        <MenuItem value="1">Direccion</MenuItem>
                                        <MenuItem value="2">Direccion</MenuItem>
                                        <MenuItem value="3">Direccion</MenuItem>
                                        <MenuItem value="4">Direccion</MenuItem>
                                    </Select>
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
                    </div>
                </div>
                <div className="section">
                    <div className='alert'>
                        <div className='border'></div>
                        <div className='icon'>
                            <FontAwesomeIcon className='alertIcon' icon={faCircleExclamation} />
                        </div>
                        <div className='text'>No hay artículos agregados al carrito</div>
                        <Button className={classes.button}>
                            Agregar
                        </Button>
                    </div>
                </div>
                <div className="section">
                    <div className='alert'>
                        <div className='border'></div>
                        <div className='icon'>
                            <FontAwesomeIcon className='alertIcon' icon={faCircleExclamation} />
                        </div>
                        <div className='text'>No hay artículos agregados al carrito</div>
                    </div>
                </div>
            </div>
            <div className='footerRecoger'>
                Cualquier duda o consulta por favor comuníquese con nuestra área de atención al cliente por WhatsApp al teléfono 951612957
            </div>
        </div>
    )
}

export default RecoverEnviarContainer