import React, { useCallback, useState } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { Logo } from '@components/Navigation/Logo/logo';
import { MainNav } from '@components/Navigation/NavLink/MainNav';
import { ROUTES } from '@routes/constants';

const pages = [
   { name: 'Home', url: ROUTES.HOME },
   { name: 'News', url: ROUTES.NEWS },
];

const Header: React.FC = () => {
   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

   const handleOpenNavMenu = useCallback((evt: React.MouseEvent<HTMLElement>): void => {
      setAnchorElNav(evt.currentTarget);
   }, [setAnchorElNav]);

   const handleCloseNavMenu = useCallback((): void => {
      setAnchorElNav(null);
   }, [setAnchorElNav]);

   return (
      <AppBar position='sticky'>
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Logo
                  anchorElNav={anchorElNav}
                  handleOpenNavMenu={handleOpenNavMenu}
                  handleCloseNavMenu={handleCloseNavMenu}
                  pages={pages}
               />
               <MainNav pages={pages} handleCloseNavMenu={handleCloseNavMenu}/>
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default Header;
