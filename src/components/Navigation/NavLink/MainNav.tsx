import React from 'react';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import * as styles from './mainNav.module.scss';
interface Props {
   pages: Array<{ name: string; url: string }>;
   handleCloseNavMenu: (item: object) => void;

}
export const MainNav: React.FC<Props> = ({ pages, handleCloseNavMenu }) => {
   return (
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         {pages.map((item, index) => (
            <Button
               key={index}
               onClick={handleCloseNavMenu}
               sx={{ my: 2, color: 'white', display: 'block' }}
            >
               <NavLink to={item.url} className={styles.link}>{item.name}</NavLink>
            </Button>
         ))}
      </Box>
   );
};