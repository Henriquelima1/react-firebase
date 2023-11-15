import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../imagens/logo.png'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { logout, auth, signInWithGoogle, signInWithGitHub } from '../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function MenuPrincipal() {

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const [anchorElMenuManutencoes, setAnchorElMenuManutencoes] = useState(null);

    const handleOpenMenuManutencoes = (event) => {
        setAnchorElMenuManutencoes(event.currentTarget);
    };

    const handleCloseMenuManutencoes = () => {
        setAnchorElMenuManutencoes(null);
    };

    const handleCloseNavMenuManutencoes = () => {
        setAnchorElNav(null);
        setAnchorElMenuManutencoes(null);
    };

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

    const handleCloseUserMenu = async () => {
       setAnchorElUser(null);

       try {
        // Exibir um menu de escolha para o usuário
            const result = await Swal.fire({
                title: 'Escolha um método de autenticação',
                showCancelButton: true,
                confirmButtonText: 'Google',
                cancelButtonText: 'GitHub',
                focusConfirm: false,
                focusCancel: false,
            });

            if (result.isConfirmed) {
                // Autenticar com o Google
                await signInWithGoogle();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Autenticar com o GitHub
                await signInWithGitHub();
            }
        
        // Outras ações após o login, se necessário
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleLogOut = () => {
        logout();
        setAnchorElUser(null);
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="icone" src={Logo} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={NavLink} to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Mecanica do Jorge
                        </Typography>
                        

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
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

                                <Box sx={{ flexGrow: 0 }}>
                                    {user &&
                                        <>
                                            <MenuItem onClick={handleOpenMenuManutencoes}>
                                                <Typography textAlign="center">Manutenções</Typography>
                                            </MenuItem>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-manutencoes"
                                                anchorEl={anchorElMenuManutencoes}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={anchorElMenuManutencoes}
                                                onClose={handleCloseMenuManutencoes}
                                            >
                                                <MenuItem onClick={handleCloseNavMenuManutencoes}
                                                    component={NavLink} to="manutencao">
                                                    <Typography textAlign="center">Novo Chamado</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    }
                                    <MenuItem onClick={handleCloseNavMenu}
                                        component={NavLink} to="sobre">
                                        <Typography textAlign="center">Sobre</Typography>
                                    </MenuItem>
                                </Box>
                            </Menu>
                        </Box>

                        {/* Fim itens menu tela pequena */}
                        {/* Inicio tela pequena - Logo Home */}
                        <Avatar sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} alt="Logo" src={Logo}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component={NavLink} to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Mecanica do Jorge
                        </Typography>
                        {/* Fim tela pequena - Logo Home */}
                        {/* Inicio itens menu tela grande */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Box sx={{ flexGrow: 0 }}>
                                {user &&
                                    <>
                                        <Button onClick={handleOpenMenuManutencoes}
                                            sx={{
                                                my: 2, color: 'white', display: 'block',
                                                textTransform: 'unset !important'
                                            }}
                                        >
                                            Manutenções
                                        </Button>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-manutencoes"
                                            anchorEl={anchorElMenuManutencoes}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={anchorElMenuManutencoes}
                                            onClose={handleCloseMenuManutencoes}
                                        >
                                            <MenuItem onClick={handleCloseMenuManutencoes}
                                                component={NavLink} to="manutencao">
                                                <Typography textAlign="center">Novo Chamado</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                }
                            </Box>
                        </Box>
                        {/* Fim itens menu tela grande */}
                        {/* Itens da direita */}
                        <Button component={NavLink} to="sobre"
                            sx={{
                                my: 1, color: 'white',
                                display: { xs: 'none', md: 'flex' },
                                textTransform: 'unset !important'
                            }}>Sobre</Button>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Menu do usuário">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}
                                    color="inherit">

                                    <Typography >{!user ? "Autenticar" : <> {user?.displayName} </>}</Typography>

                                    <AccountCircle />


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
                            >
                                {user &&
                                    <MenuItem onClick={handleLogOut}
                                        component={NavLink} to="/">
                                        <Typography textAlign="center">Efetuar Logout</Typography>
                                    </MenuItem>
                                }
                                {!user &&
                                    <MenuItem onClick={handleCloseUserMenu}
                                        component={NavLink} to="/">
                                        <Typography textAlign="center">Efetuar Login</Typography>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
export default MenuPrincipal;