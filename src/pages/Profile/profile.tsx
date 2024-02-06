import * as styles from '././profile.module.scss';
import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

interface Props {

}
const Profile: React.FC<Props> = () => {
   return  (
      <Box className={styles.indentation}>
         <Grid container>
            <Grid item xs={4} > Images</Grid>
            <Grid item xs={8} > Images</Grid>
         </Grid>
      </Box>
   );

};
export default Profile;
