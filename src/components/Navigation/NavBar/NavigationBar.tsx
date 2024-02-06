import React from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import * as styles from './navigationBar.module.scss';
import { Pages } from '../navigation.types';
import { Link } from 'react-router-dom';
import { UserInfo } from '@firebase/auth';

interface Props {
   handleOpenUserMenu: (evt: React.MouseEvent<HTMLElement>) => void
   anchorElUser: null | HTMLElement
   handleCloseUserMenu: () => void
   handlerUserMenu: (fld: string) => void
   settings: Pages[]
   currentUser: UserInfo | null
}
export const NavigationBar: React.FC<Props> = ({
   handleOpenUserMenu,
   anchorElUser,
   handleCloseUserMenu,
   handlerUserMenu,
   settings,
   currentUser,
}) => {
   const handlerClick = ({ name }: Pages) => () => {
      handleCloseUserMenu();
      handlerUserMenu(name);
   };

   return (
      <Box className={styles.box}>
         <Tooltip title={currentUser?.displayName || ''}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Avatar alt="Remy Sharp" src={currentUser?.photoURL || ''}/>
            </IconButton>
         </Tooltip>
         <Menu
            className={styles.menu}
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
            {settings.map((item, index) => (
               <MenuItem key={index}>
                  <Link to={item.url} className={styles.link} onClick={handlerClick(item)}>{item.name}</Link>
               </MenuItem>
            ))}
         </Menu>
      </Box>
   );
};