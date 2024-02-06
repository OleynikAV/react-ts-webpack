import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import * as styles from './loader.module.scss';
import { useAppSelector } from '../../core/redux/hooks';

interface Props {
   size?: number
}
const defaultSize = 200;
export const Loader: React.FC<Props> = () => {
   const preloader = useAppSelector(({ store }) => store.preloader);
   
   return (
      <>
         {preloader && <Box className={[styles.container,styles.centered].join(' ')}>
            <CircularProgress disableShrink size={defaultSize} className={[styles.centered, styles.centeredElement].join(' ')} />
         </Box>}
      </>
   );
};