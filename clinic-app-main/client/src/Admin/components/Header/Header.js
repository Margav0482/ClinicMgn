import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import './Header.css';

const Header = (headerPages) => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);

  //const pagess = ["dashboard", "patient", "medicine", "treatment", "appoinment"];
  let pages: string[] = headerPages.headerPages

  console.log(`Header.js: (admin) headerPages Arguments: ${JSON.stringify([pages])}`);
  const settings = [];
  const pathUrl = history.location.pathname;

  const logoutHandler = () => {
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
    history.push('/admin');
  }

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


  return (
    <AppBar className="header_wepper appBar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           <img
              src='/images/clinic_logo.jpg'
              className='App-logo'
              alt='logo'
              height={50}
              width={50}
            />&nbsp; 
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Clinic App
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
              {
                pages.map((page, index) => (
                <Button
                  className={pathUrl === `/admin/${page}` ? "openLinkActive" : "openLink"}
                  key={index-1}
                  component={NavLink}
                  to={"/admin/" + page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, marginRight: '10px', color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))
            }

              {/* <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem> */}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Clinic App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                className={pathUrl === `/admin/${page}` ? "linkActive" : "headerLink"}
                key={index}
                component={NavLink}
                to={"/admin/" + page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, marginRight: '10px', color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="A" src="" />
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
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={"/admin/" + setting}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key={"logout"} className='button' onClick={logoutHandler}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;