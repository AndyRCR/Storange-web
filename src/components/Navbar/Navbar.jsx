import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast, faCirclePlus, faFaceLaugh } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalStateContext';
import './Navbar.css'

const Navbar = () => {

    const { webkitBrowser, browser, propietario, setChange, change, setLoaderState, restartAll, setDireccionSelect, setOe, oe, setFormEnvioPage, carrito, formatStrings } = useContext(GlobalContext)
    const navigate = useNavigate()

    const pages = [
        {text: 'Recoger/Enviar', path:'/pickup_send'},
        {text: 'Mis articulos', path:'/dashboard'},
        {text: 'Perfil', path:'/perfil'}
    ]

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [innerWidth, setInnderWidth] = useState(window.innerWidth)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };

    const handleInnerWidth = () => setInnderWidth(window.innerWidth)

    useEffect(() => {

        window.addEventListener('resize', handleInnerWidth)

        return () =>{
            window.removeEventListener('resize',handleInnerWidth)
        }
    }, [propietario])

    return (
        <div className='navbar'>
            <AppBar position="static" className='appbar'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters style={{justifyContent: 'space-between'}}>
                        <Box style={{
                            display: innerWidth < 900 ? 'flex' : 'none',
                        }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                style={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                    key={page.text}
                                    onClick={() => {
                                        window.scrollTo(0, 0)
                                        handleCloseNavMenu()
                                        setChange(!change)
                                        setLoaderState(0)
                                        setTimeout(() => {
                                            navigate(page.path)
                                            setOe({
                                                ...oe,
                                                direccion: ''
                                            })
                                            setDireccionSelect('default')
                                            setFormEnvioPage(1.5)
                                        }, 500)
                                    }}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <img
                        src={'https://storange-images.s3.amazonaws.com/img/storangelogo_white.webp'}
                        style={{
                            width: innerWidth < 450 ? '150px' : '200px'
                        }}
                        alt="storange logo" />

                        <Box
                        sx={{flexGrow: 'initial', display: { xs: 'none', md: 'flex' } }}
                        >
                            <div
                                className={'navLink'}
                                onClick={() => {
                                    window.scrollTo(0, 0)
                                    setChange(!change)
                                    setLoaderState(0)
                                    setTimeout(() => {
                                        navigate('/pickup_send')
                                        setOe({
                                            ...oe,
                                            direccion: ''
                                        })
                                        setDireccionSelect('default')
                                        setFormEnvioPage(1.5)
                                    }, 500)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <FontAwesomeIcon className='menuIcon' icon={faTruckFast} />
                                    {carrito !== null ? (
                                        <div className='indicator'>
                                            {carrito.length}
                                        </div>
                                    ) : false}
                                </div>
                                <div>Recoger/Enviar</div>
                            </div>

                            <div
                                className={'navLink'}
                                onClick={() => {
                                    window.scrollTo(0, 0)
                                    setChange(!change)
                                    setLoaderState(0)
                                    setTimeout(() => navigate('/dashboard'), 500)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <FontAwesomeIcon className='menuIcon' icon={faCirclePlus} />
                                <div>Mis articulos</div>
                            </div>

                            <div
                                className={'navLink'}
                                onClick={() => {
                                    window.scrollTo(0, 0)
                                    setChange(!change)
                                    setLoaderState(0)
                                    setTimeout(() => navigate('/perfil'), 500)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <FontAwesomeIcon className='menuIcon' icon={faFaceLaugh} />
                                <div>Perfil</div>
                            </div>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {propietario !== null && (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar className='avatar' alt={propietario.nombre} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                        className='menu'
                                    >
                                        <div className="menuItem">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar style={{ backgroundColor: '#795548' }} alt={propietario.nombre} src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                            <h3 className='name'>
                                                {`${formatStrings(propietario.nombre)} ${formatStrings(propietario.apellido || '')}`}
                                            </h3>
                                            <p className='email'>
                                                {propietario.email}
                                            </p>
                                        </div>
                                        <div onClick={() =>{
                                            window.scrollTo(0, 0)
                                            setChange(!change)
                                            setLoaderState(0)
                                            handleCloseUserMenu()
                                            setTimeout(() => navigate('/perfil'), 500)
                                        }} className="menuItem">Editar Perfil</div>
                                        <div onClick={() =>{
                                            window.scrollTo(0, 0)
                                            handleCloseUserMenu()
                                            setTimeout(() => {
                                                navigate('/')
                                                restartAll()
                                            }, 500)
                                        }} className="menuItem">Cerrar Sesión</div>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Navbar