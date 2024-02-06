import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as styles from './logo.module.scss';
import { Pages } from '../navigation.types';

interface Props {
  anchorElNav: null | HTMLElement
  handleOpenNavMenu: (evt: React.MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: () => void
   pages: Pages[]
}
export const Logo: React.FC<Props> = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu, pages }) => {

   return (
      <Box>
         <Typography variant="h6" noWrap component="a" href="/" className={styles.logo} sx={{ display: { xs: 'none', md: 'flex' } }}>
         LOGO
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
               <MenuIcon/>
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
               {pages.map((item, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                     <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
               ))}
            </Menu>
         </Box>
         <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            className={styles.logo}
            sx={{
               display: { xs: 'flex', md: 'none' },
               flexGrow: 1,
            }}
         >
        LOGO
         </Typography>

      </Box>
   );
};
