import React, { useContext, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@mui/styles'
import { Pagination, TextField } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalStateContext'
import Article from '../ArticleItem/ArticleItem'
import { ClimbingBoxLoader } from 'react-spinners'
import './ArticlesList.css'

const CssTextField = withStyles({
    root: {
        '&': {
            margin: '10px 0 !important'
        },
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
    root: {
        '& ul > li:not(:first-child):not(:last-child) > button.Mui-selected': {
            backgroundColor: '#F94700',
            color: '#fff',
            fontWeight: 'bold'
        },
        '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
            fontWeight: 'bold'
        }
    }
})

const ArticlesList = () => {

    const classes = useStyles()

    const { articulos, filteredArticles, buscarArticulos, activeFilters, page, setPage } = useContext(GlobalContext)

    const [filter, setFilter] = useState('')

    const handleFilterChange = (e) => {
        const {value} = e.target
        setFilter(value.toLowerCase())
        setPage(1)
    }

    useEffect(() => {
        if(activeFilters.length === 0){
            buscarArticulos()
        }
    }, [filter, articulos, filteredArticles])

    return (
        <div className='articlesList'>
            <div className='articlesFilter'>
                <h3>Buscar Articulos</h3>
                <CssTextField
                    label="Buscar"
                    variant="outlined"
                    name="article"
                    size='small'
                    style={{ width: '100%' }}
                    onChange={handleFilterChange}
                />
            </div>
            {articulos !== null ? (
                filteredArticles
                .filter(el =>{
                    return el.titulo.toLowerCase().includes(filter) || el.descripcion?.toLowerCase().includes(filter) || el.descripcionPropietario?.toLowerCase().includes(filter)
                }).length > 0 ? (
                    <>
                        <div className="articlesPagination" style={{display: 'flex', justifyContent: 'center'}}>
                            <Pagination
                            showFirstButton
                            showLastButton
                            page={page}
                            className={classes.root}
                            onChange={(e, pageNumber) => setPage(pageNumber)}
                            count={Math.ceil([...filteredArticles]
                                .filter(el =>{
                                    return (el.titulo.toLowerCase().includes(filter) || el.descripcion?.toLowerCase().includes(filter) || el.descripcionPropietario?.toLowerCase().includes(filter))
                                }).length/10)}
                            shape="rounded" />
                        </div>
                        {[...filteredArticles]
                        .filter(el =>{
                            return (el.titulo.toLowerCase().includes(filter) || el.descripcion?.toLowerCase().includes(filter) || el.descripcionPropietario?.toLowerCase().includes(filter))
                        })
                        .slice((page-1)*10, (page-1)*10+10).map(articulo => {
                            return (
                                <Article key={articulo.idArticulo} articulo={articulo} />
                            )
                        })}
                        <div className="articlesPagination">
                            <Pagination
                            showFirstButton
                            showLastButton
                            className={classes.root}
                            page={page}
                            onChange={(e, pageNumber) => setPage(pageNumber)}
                            count={Math.ceil([...filteredArticles]
                                .filter(el =>{
                                    return (el.titulo.toLowerCase().includes(filter) || el.descripcion?.toLowerCase().includes(filter) || el.descripcionPropietario?.toLowerCase().includes(filter))
                                }).length/10)}
                            shape="rounded" />
                        </div>
                    </>
                ) : (
                    <div className='loadingSpinner'>
                        <img src="https://storange-images.s3.amazonaws.com/Storange_1001322067/no+results.png" alt="storange no results" />
                        <h1>No se encontraron resultados</h1>
                    </div>
                )
            ) : (
                <div className='loadingSpinner'>
                    <ClimbingBoxLoader size={20} color={'#F94700'} />
                    <h3>Cargando...</h3>
                </div>
            )}
        </div>
    )
}

export default ArticlesList