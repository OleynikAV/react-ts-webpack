import * as styles from './app.module.scss';
import React from 'react';
import Header from '@layout/Header/header';
import Footer from '@layout/Footer/footer';
import { Box } from '@mui/material';
import { Main } from '@layout/Main/main';
import classNames from 'classnames';

export default function App() {

   const combinedClasses = classNames(styles.wrapper);

   return (
      <Box className={combinedClasses}>
         <Header />
         <Main/>
         <Footer />
      </Box>
   );
}
