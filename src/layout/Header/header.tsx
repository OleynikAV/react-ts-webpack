import React, { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AppBar, Container, Toolbar } from '@mui/material';
import { Logo } from '../../components/Navigation/Logo/logo';
import { MainNav } from '../../components/Navigation/NavLink/MainNav';
import { NavigationBar } from '../../components/Navigation/NavBar/NavigationBar';
import { ROUTES } from '../../routes/constants';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { handlerAlerts, handlerGetCurrentUser } from '../../core/redux/slices/storeSlice';
import { useAppDispatch } from '../../core/redux/hooks';
import { MESSAGES } from '../../assets/messages/messages';
import { UserInfo } from '@firebase/auth';

const pages = [
   { name: 'Home', url: ROUTES.HOME },
   { name: 'News', url: ROUTES.NEWS },
   { name: 'Login', url: ROUTES.LOGIN },
];

const settings  = [
   { name: 'Profile', url: ROUTES.PROFILE },
   { name: 'Account', url: '/account' },
   { name: 'Dashboard', url: '/' },
   { name: 'Logout', url: '/' },
];

interface Props {
   
}


const Header: React.FC<Props> = () => {
   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
   const [isAuth, setAuth] = useLocalStorage<string>('isAuth', '');
   const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
   const auth = getAuth();
   const dispatch = useAppDispatch();

   const handleOpenNavMenu = useCallback((evt: React.MouseEvent<HTMLElement>): void => {
      setAnchorElNav(evt.currentTarget);
   },[setAnchorElNav]);

   const handleOpenUserMenu = useCallback((evt: React.MouseEvent<HTMLElement>): void => {
      setAnchorElUser(evt.currentTarget);
   },[setAnchorElUser]);

   const handleCloseNavMenu = useCallback((): void => {
      setAnchorElNav(null);
   },[setAnchorElNav]);

   const handleCloseUserMenu = useCallback((): void => {
      setAnchorElUser(null);
   },[setAnchorElUser]);

   const handleLogout = async (): Promise<void> => {
      try {
         await signOut(auth);
         setAuth('');
      } catch (error) {
         console.error(error, 'error');
      }
   };

   const handlerUserMenu = useCallback(
      async (fld: string): Promise<void> => {
         if (fld === 'Logout') {
            await handleLogout();
            dispatch(handlerAlerts(({ type: 'success', description: MESSAGES.logoutSuccessMessage, show: true })));
            setCurrentUser(null);
         }
      },[handleLogout]);

   const isUserRegistered = () => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const { uid, providerData } = user;
            const selectedUserInfo = providerData[0];
            setAuth(uid);
            setCurrentUser(selectedUserInfo);
            dispatch(handlerGetCurrentUser(selectedUserInfo));
         } else {
            setAuth('');
         }
      });
   };

   useEffect(() => {
      isUserRegistered();

   }, [isAuth]);

   return (
      <AppBar position={'sticky'}>
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Logo
                  anchorElNav={anchorElNav}
                  handleOpenNavMenu={handleOpenNavMenu}
                  handleCloseNavMenu={handleCloseNavMenu}
                  pages={pages}
               />
               <MainNav pages={pages} handleCloseNavMenu={handleCloseNavMenu}/>
               <NavigationBar
                  handleOpenUserMenu={handleOpenUserMenu}
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={handleCloseUserMenu}
                  handlerUserMenu={handlerUserMenu}
                  settings={settings}
                  currentUser={currentUser}
               />
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default Header;
