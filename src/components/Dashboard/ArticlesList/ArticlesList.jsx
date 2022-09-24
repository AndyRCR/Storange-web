import React, { useContext, useEffect, useState } from 'react'
import { withStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalStateContext'
import CircularProgress from '@mui/material/CircularProgress'
import './ArticlesList.css'
import Article from '../ArticleItem/ArticleItem'

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

    const { articulos, filteredArticles, handleFilters, cajaFilter, sueltoFilter } = useContext(GlobalContext)

    useEffect(() => {
        handleFilters()
    }, [articulos])

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
                />
            </div>
            {filteredArticles?.length > 0 ? (
                filteredArticles.map(articulo => {
                    return (
                        <Article key={articulo.idArticulo} articulo={articulo} />
                    )
                })
            ) : (
                <CircularProgress style={{ 'color': '#F94700', 'margin': '20px' }} />
            )}
        </div>
    )
}

export default ArticlesList