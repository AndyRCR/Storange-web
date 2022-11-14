import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faAnglesUp, faFilter, faX } from '@fortawesome/free-solid-svg-icons'
import { SyncLoader } from 'react-spinners'
import { GlobalContext } from '../../../context/GlobalStateContext'
import { useState } from 'react'
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

    const { articulos, setActiveFilters, activeFilters, handleFilters, filtersDisplayed, setFiltersDisplayed } = useContext(GlobalContext)

    const [checks, setChecks] = useState([false, false, false, false, false, false])
    const [resize, setResize] = useState(window.innerWidth < 1000)

    const handleResize = () => setResize(window.innerWidth < 1000)

    const clearFilters = () => {
        setActiveFilters([])
        setChecks([false, false, false, false, false, false])
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
      
        return () => {
          window.removeEventListener('resize', handleResize)
        }
    }, [articulos, checks, resize])

    return (
        <div className='filters'>
            <h1>Filtrar</h1>
            <div className='filtersContainer'>
                <div className='estadoFilters'>
                    <h3>Estado de Articulo</h3>
                    {articulos !== null ? (
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([!checks[0], checks[1], checks[2], checks[3], checks[4], checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 1])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 1))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[0]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`Almacenado (${articulos.filter(el => el.idEstadoArticulo === 1).length})`} />
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([checks[0], !checks[1], checks[2], checks[3], checks[4], checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 2])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 2))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[1]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`En venta (${articulos.filter(el => el.idEstadoArticulo === 2).length})`} />
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([checks[0], checks[1], !checks[2], checks[3], checks[4], checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 3])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 3))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[2]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`Proceso de envio (${articulos.filter(el => el.idEstadoArticulo === 3).length})`} />
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([checks[0], checks[1], checks[2], !checks[3], checks[4], checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 5])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 5))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[3]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`Eliminados (${articulos.filter(el => el.idEstadoArticulo === 5).length})`} />
                        </FormGroup>
                    ) : (
                        <div className='filterSpinner'>
                            <SyncLoader size={10} color={'#F94700'} />
                        </div>
                    )}
                </div>
                <div className="tipoFilters">
                    <h3>Tipo de Articulo</h3>
                    {articulos !== null ? (
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([checks[0], checks[1], checks[2], checks[3], !checks[4], checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 'caja'])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 'caja'))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[4]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`Caja (${articulos.filter(el => el.tipoArticulo.toLowerCase() === 'caja').length})`} />
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={e => {
                                        setChecks([checks[0], checks[1], checks[2], checks[3], checks[4], !checks[5]])
                                        if (e.target.checked) {
                                            setActiveFilters([...activeFilters, 'suelto'])
                                        } else {
                                            setActiveFilters([...(activeFilters.filter(el => el !== 'suelto'))])
                                        }
                                    }}
                                    className='checkLabel'
                                    checked={checks[5]}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#F94700',
                                        },
                                    }} />}
                                label={`Suelto (${articulos.filter(el => el.tipoArticulo.toLowerCase() === 'suelto').length})`} />
                        </FormGroup>
                    ) : (
                        <div className='filterSpinner'>
                            <SyncLoader size={10} color={'#F94700'} />
                        </div>
                    )}
                </div>
                <div className='buttons'>
                    <Button
                        onClick={clearFilters}
                        className={classes.buttonClear}
                        variant='contained'>
                        <FontAwesomeIcon onClick={clearFilters} className='filterIcon' icon={faX} />
                        Limpiar filtros
                    </Button>

                    <Button
                        onClick={handleFilters}
                        className={classes.buttonFilter}
                        variant='contained'>
                        <FontAwesomeIcon className='filterIcon' icon={faFilter} />
                        Filtrar articulos
                    </Button>
                </div>
            </div>

            <div className='filterDisplayButton' style={{ display: resize ? 'flex' : 'none' }}>
                <div>
                    <p onClick={() => setFiltersDisplayed(!filtersDisplayed)}>
                        {!filtersDisplayed ? 'Ocultar filtros' : 'Mostrar filtros'}
                    </p>
                    <FontAwesomeIcon
                        onClick={() => setFiltersDisplayed(!filtersDisplayed)}
                        className={!filtersDisplayed ? 'showFilterIcon pressed' : 'showFilterIcon'}
                        icon={!filtersDisplayed ? faAnglesUp : faAnglesDown} />
                </div>
            </div>
        </div>
    )
}

export default Filters