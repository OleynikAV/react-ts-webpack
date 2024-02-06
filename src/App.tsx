import * as styles from './app.module.scss';
import React from 'react';
import Header from './layout/Header/header';
import Footer from './layout/Footer/footer';
import './firebase/Firebase';
import { Box } from '@mui/material';
import { Main } from './layout/Main/main';

export default function App() {
   return (
      <Box className={styles.wrapper}>
         <Header />
         <Main/>
         <Footer />
      </Box>
   );
}
