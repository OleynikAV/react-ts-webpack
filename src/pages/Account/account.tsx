import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, InputLabel, FormControl, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../core/redux/hooks';
import { UserInfo } from '@firebase/auth';
import * as styles from './account.module.scss';
import { handlerAlerts, handlerPreloader } from '../../core/redux/slices/storeSlice';
import { MESSAGES } from '../../assets/messages/messages';
interface Props {
   
}
export const Account: React.FC<Props> = () => {
   const auth = getAuth();
   const dispatch = useAppDispatch();
   const dateCurrentUser = useAppSelector(({ store }) => store.currentUser);
   const [modifiedUserData, setModifiedUserData] = useState <UserInfo>(dateCurrentUser);
   const [show, setShow] = useState<boolean>(false);


   const handlerUpdateUser = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void => {
      const typeEvent: string | undefined = evt.target.dataset.field;
      const value : string = evt.target.value;
      typeEvent && setModifiedUserData((prevState) => ({ ...prevState, [typeEvent]: value }));
   };

   const handlerSubmit = async (): Promise<void> => {
      try {
         const currentUser = auth.currentUser;
         dispatch(handlerPreloader(true));
         if (currentUser) {
            await updateProfile(currentUser, modifiedUserData);
            dispatch(handlerAlerts({ type: 'success', description: MESSAGES.successChangeUserDataMessage, show: true }));
            dispatch(handlerPreloader(false));
         }
      } catch (error) {
         dispatch(handlerPreloader(false));
         dispatch(handlerAlerts({ type: 'error', description: 'error', show: true }));
      }
   };

   const handlerHover = () => {
      setShow((prevState) => !prevState);
   };

   useEffect(() => {
      setModifiedUserData(dateCurrentUser);
   }, [dateCurrentUser]);

   return (
      <Box>
         <Grid container justifyContent={'center'} className={styles.marginTop}>
            <Typography variant='subtitle1' component={'p'} align='center'>Welcome to {modifiedUserData.displayName || ''}</Typography>
         </Grid>
         <Grid container flexDirection={'column'} alignItems={'center'} className={styles.marginTop}>
            <Grid item md={4} className={styles.marginTop}>
               <FormControl variant="standard" className={styles.widthInput}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                     Email Address
                  </InputLabel>
                  <TextField
                     onChange={handlerUpdateUser}
                     value={modifiedUserData.email || ''}
                     type='email'
                     variant='standard'
                     margin='normal'
                     fullWidth
                     inputProps={{ 'data-field': 'email' }}
                  />
               </FormControl>

            </Grid>
            <Grid item md={4} className={styles.marginTop}>
               <FormControl variant="standard" className={styles.widthInput}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                     User name
                  </InputLabel>
                  <TextField
                     onChange={handlerUpdateUser}
                     value={modifiedUserData.displayName || ''}
                     margin='normal'
                     type='name'
                     variant='standard'
                     inputProps={{ 'data-field': 'displayName' }}
                     data-field={'displayName'}
                     fullWidth
                  />
               </FormControl>
            </Grid>
            <Grid item md={4} className={styles.marginTop}>
               <FormControl variant="standard" className={styles.widthInput}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                     Photo user
                  </InputLabel>
                  <TextField
                     onChange={handlerUpdateUser}
                     value={modifiedUserData.photoURL || ''}
                     margin='normal'
                     type='url'
                     variant='standard'
                     fullWidth
                     inputProps={{ 'data-field': 'photoUrl' }}
                  />
                  <Button variant={'contained'} onClick={handlerHover}>{show ? 'Hidden' : 'Show '} photo user</Button>
               </FormControl>
            </Grid>
            <Grid item md={4}>
               {show && <img src={modifiedUserData.photoURL || ''} alt="photoProfile"
                  className={styles.sizePhoto}/>}
            </Grid>
            <Grid item md={4} className={styles.marginTop}>
               <Button variant={'contained'} onClick={handlerSubmit} >Submit</Button>
            </Grid>
         </Grid>
      </Box>
   );
};