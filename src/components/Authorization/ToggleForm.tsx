import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import * as styles from './authorization.module.scss';

interface Props {
   handlerClick:  () => void
   isActive: boolean
}
export const ToggleForm: React.FC<Props> = ({ handlerClick, isActive }) => {
   const titleToggle = isActive ? 'Welcome Back!' : 'Hello, Friend!';
   const descriptionToggle: string = isActive ?
      'Enter your personal details to use all of site features'
      :
      'Register with your personal details to use all of site features';
   const titleButtonToggle: string  = isActive ? 'Sign In' : 'Sign Up';

   return (
      <Box className={styles.toggleContainer}>
         <Box className={styles.toggle}>

            <Box className={[styles.togglePanel, isActive ? styles.toggleLeft : styles.toggleRight].join(' ')}>
               <Typography variant={'h4'} component={'h1'}>{titleToggle}</Typography>
               <Typography component={'p'} className={styles.margins}>{descriptionToggle}
               </Typography>
               <Button onClick={handlerClick}>
                  {titleButtonToggle}
               </Button>
            </Box>
         </Box>
      </Box>
   );
};