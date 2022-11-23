import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const useStyles = makeStyles({
    button: {
        '&.Mui-disabled':{
            backgroundColor: '#E5E5E5 !important',
            color: '#ABABAB !important'
          },
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#fff !important',
        width: '150px !important',
        height: 'fit-content !important'
    },
    buttonDireccion: {
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#fff !important',
        width: '200px !important',
        height: 'fit-content !important',
        margin: '20px 0 !important'
    },
    buttonWhite: {
        backgroundColor: '#fff !important',
        border: '1px solid #f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        color: '#f94700 !important',
        width: '150px !important',
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
    },
    radio: {
        '&.Mui-checked': {
            color: 'var(--color-storange) !important'
        }
    },
    picker: {
        '& .MuiPickersToolbar-penIconButton': {
            display: 'none !important'
        },
        '& .MuiDialogActions-root':{
            display: 'none !important'
        },
        '& .MuiButtonBase-root.Mui-selected': {
            backgroundColor: 'var(--color-storange) !important'
        },
        '& .MuiPickersToolbar-root':{
            backgroundColor: 'var(--color-storange) !important',
            color: 'white !important',
            ['@media (max-width:800px)']: {
                display: 'none !important'
            }
        },
        '& .MuiTypography-overline': {
            display: 'none !important'
        },
        '&':{
            overflow: 'hidden !important',
            borderRadius: '4px !important',
            boxShadow: '0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12) !important'
        }
    }
})

const isWeekend = (date) => {
    const day = date.day()
    return day === 0 || day === 6 || date.$d < new Date(Date.now())
}

const FormFecha = () => {

    const classes = useStyles()

    const { browser, setFormEnvioPage, direcciones, setActiveDireccionModal, oe, setOe } = useContext(GlobalContext)

    const [direccionSelect, setDireccionSelect] = useState("default")
    const [direccionName, setdireccionName] = useState(null)
    const [tipoEnvio, setTipoEnvio] = useState("normal")
    const [value, setValue] = useState(dayjs(new Date(Date.now()).toISOString().slice(0,10)))

    useEffect(() => {
        if(direcciones !== null){
            setdireccionName(Array.from(new Set(direcciones.map(el => el.direccion))))
        }
    }, [direcciones])

    return (
        <div className={browser === 'Safari' ? 'test safari' : 'test'}>
            <div className='formDireccion'>
                <div className='formButtons'>
                    <Button onClick={() => setFormEnvioPage(browser === 'Safari' ? 1 :  1)} className={classes.buttonWhite}>
                        Atrás
                    </Button>
                </div>
                <div>
                    <div className='stepItem'>
                        <div className='step'>3</div>
                        <div>
                            <h4 style={{ fontWeight: 'bold' }}>Fecha de envío</h4>
                            <p>¿Cuando desea que recojamos sus cosas?</p>
                        </div>
                    </div>

                    <div>
                        <p>Fecha de envio:</p>
                        {/* <RadioGroup
                            name="tipoEnvio"
                            value={tipoEnvio}
                            onChange={(e) => setTipoEnvio(e.target.value)}
                        >
                            <FormControlLabel value="normal" control={<Radio className={classes.radio} />} label="Normal (Mínimo de 48 horas para el despacho)" />
                            <FormControlLabel value="express" control={<Radio className={classes.radio} />} label="Express (Te lo enviaremos entre las 24 y 48 horas siguientes)" />
                        </RadioGroup> */}
                        <div className='direccionContainer'>
                            {tipoEnvio === 'normal' && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StaticDatePicker
                                        className={classes.picker}
                                        orientation="landscape"
                                        // openTo="day"
                                        value={value}
                                        shouldDisableDate={isWeekend}
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(newValue) => {
                                            setValue(newValue)
                                            setOe({
                                                ...oe,
                                                fecha: newValue.$d.toISOString().slice(0,10)
                                            })
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        </div>
                    </div>
                </div>
                <div className='formButtons'>
                    <Button
                        onClick={() => {
                        window.scrollTo(0, 0)
                        setFormEnvioPage(browser === 'Safari' ? 3 :  -1)
                        }}
                        className={classes.button} disabled={oe.direccion === '' || oe.direccion === 'default'}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormFecha