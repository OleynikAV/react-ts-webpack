import * as styles from './login.module.scss';
import React from 'react';
import { Authorization } from '../../components/Authorization/Authorization';
import { Box } from '@mui/material';

interface Props {

}


const Login: React.FC<Props> = () => {
   return(
      <Box className={styles.position}>
         <Authorization/>
      </Box>
   );
};
export default Login;
