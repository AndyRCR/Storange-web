import React, { useContext, useEffect } from 'react'
import { withStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalStateContext'
import Article from '../ArticleItem/ArticleItem'
import { ClimbingBoxLoader } from 'react-spinners'
import './ArticlesList.css'

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

const ArticlesList = () => {

    const { articulos, filteredArticles, handleFilters, filter, setFilter, buscarArticulos } = useContext(GlobalContext)

    const handleFilterChange = (e) =>{
        setFilter(e.target.value)
    }

    useEffect(() => {
        handleFilters()
        buscarArticulos()
    }, [articulos, filter])

    return (
        <div className='articlesList'>
            <div className='articlesFilter'>
                <h1>Articulos</h1>
                <CssTextField
                    label="Buscar"
                    variant="outlined"
                    name="article"
                    size='small'
                    style={{ width: '100%' }}
                    onChange={handleFilterChange}
                />
            </div>
            {filteredArticles !== null ? (
                filteredArticles.length > 0 ? (
                    filteredArticles.map(articulo => {
                        return (
                            <Article key={articulo.idArticulo} articulo={articulo} />
                        )
                    })
                ) : (
                    <div className='loadingSpinner'>
                        <h1>No se encontraron resultados :(</h1>
                    </div>
                )
            ) : (
                <div className='loadingSpinner'>
                    <ClimbingBoxLoader size={20} color={'#F94700'}/>
                    <h3>Cargando...</h3>
                </div>
            )}
        </div>
    )
}

export default ArticlesList