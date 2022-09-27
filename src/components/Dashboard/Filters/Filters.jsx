import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faX } from '@fortawesome/free-solid-svg-icons'
import { SyncLoader } from 'react-spinners'
import { GlobalContext } from '../../../context/GlobalStateContext'
import './Filters.css'

const useStyles = makeStyles({
    buttonFilter: {
        backgroundColor: '#f94700 !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important'
    },
    buttonClear: {
        backgroundColor: 'transparent !important',
        color: '#f94700 !important',
        border: '1px solid #f94700 !important',
        boxShadow: 'none !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important'
    }
})

const Filters = () => {

    const classes = useStyles()

    const { articulos, setCajaFilter, setSueltoFilter, cajaFilter, sueltoFilter, handleFilters } = useContext(GlobalContext)

    const clearFilters = () =>{
        setCajaFilter(false)
        setSueltoFilter(false)
    }

    useEffect(() => {
    }, [articulos, cajaFilter, sueltoFilter])

    return (
        <div className='filters'>
            <h1>Filtrar</h1>
            <div className='estadoFilters'>
                <h3>Estado de Articulo</h3>
                {articulos !== null ? (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                            label={`Almacenado (${articulos.filter(el => el.idEstadoArticulo === 1).length})`} />
                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                            label={`En venta (${articulos.filter(el => el.idEstadoArticulo === 2).length})`} />
                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                            label={`Proceso de envio (${articulos.filter(el => el.idEstadoArticulo === 3).length})`} />
                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                            label={`Eliminados (${articulos.filter(el => el.idEstadoArticulo === 4).length})`} />
                    </FormGroup>
                ) : (
                    <div className='filterSpinner'>
                        <SyncLoader size={10} color={'#F94700'}/>
                    </div>
                )}
            </div>
            <div className="tipoFilters">
                <h3>Tipo de Articulo</h3>
                {articulos !== null ? (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={e => setCajaFilter(e.target.checked)}
                                checked={cajaFilter}
                                value={cajaFilter}
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                                label={`Caja (${articulos.filter(el => el.tipoArticulo.toLowerCase() === 'caja').length})`} />
                        <FormControlLabel
                            control={<Checkbox
                                onChange={e => setSueltoFilter(e.target.checked)}
                                checked={sueltoFilter}
                                value={sueltoFilter}
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#F94700',
                                    },
                                }} />}
                                label={`Suelto (${articulos.filter(el => el.tipoArticulo.toLowerCase() === 'suelto').length})`} />
                    </FormGroup>
                ) : (
                    <div className='filterSpinner'>
                        <SyncLoader size={10} color={'#F94700'}/>
                    </div>
                )}
            </div>
            <div className='buttons'>
                <Button
                    onClick={clearFilters}
                    className={classes.buttonClear}
                    variant='contained'>
                    <FontAwesomeIcon className='filterIcon' icon={faX} />
                    Limpiar filtros
                </Button>

                {/* <Button
                    onClick={handleFilters}
                    className={classes.buttonFilter}
                    variant='contained'>
                    <FontAwesomeIcon className='filterIcon' icon={faFilter} />
                    Filtrar articulos
                </Button> */}
            </div>
        </div>
    )
}

export default Filters