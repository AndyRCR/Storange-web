import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
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
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalStateContext';

const pages = ['Recoger/Enviar', 'Mis articulos', 'Perfil'];

const Navbar = () => {

    const { propietario } = useContext(GlobalContext);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
    }, [propietario])

    return (
        <div className='navbar'>
            <div className='navbarLogo'>
                <img src="https://app.storange.pe/wp-content/themes/storange/app/static/images/logo-white.svg?key=1659564954838" alt="storange logo" />
            </div>
            <AppBar position="static" className='appbar'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                style={{color: '#000'}}
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
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <NavLink
                                className={ ({isActive}) => isActive ? 'navLink activeNavLink' : 'navLink'}
                                to={'/pickup_send'}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <FontAwesomeIcon className='menuIcon' icon={faTruckFast}/>
                                <div>Recoger/Enviar</div>
                            </NavLink>

                            <NavLink
                                className={ ({isActive}) => isActive ? 'navLink activeNavLink' : 'navLink'}
                                to={'/dashboard'}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <FontAwesomeIcon className='menuIcon' icon={faCirclePlus}/>
                                <div>Mis articulos</div>
                            </NavLink>

                            <NavLink
                                className={ ({isActive}) => isActive ? 'navLink activeNavLink' : 'navLink'}
                                to={'/perfil'}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <FontAwesomeIcon className='menuIcon' icon={faFaceLaugh}/>
                                <div>Perfil</div>
                            </NavLink>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {propietario !== null && (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar className='avatar' alt={propietario.nombre} src="/static/images/avatar/2.jpg"/>
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
                                                <Avatar style={{backgroundColor: '#795548'}} alt={propietario.nombre} src="/static/images/avatar/2.jpg"/>
                                            </IconButton>
                                            <h3 className='name'>
                                                {`${propietario.nombre} ${propietario?.apellido}`}
                                            </h3>
                                            <p className='email'>
                                                {propietario.email}
                                            </p>
                                        </div>
                                        <div className="menuItem">Editar Perfil</div>
                                        <div className="menuItem">Cerrar Sesión</div>
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