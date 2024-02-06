import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface Props {
   open: boolean
   handleClose: () => void
   handlerSubmitResetPassword: (value: string) => void
   emailPattern: RegExp
}
export const ResetPassword: React.FC<Props> = ({
   open,
   handleClose,
   handlerSubmitResetPassword,
   emailPattern,
}) => {
   const [valuesResetEmail, setValuesResetEmail] = useState<string>('');
   const [validResetEmail, setValidResetEmail] = useState<boolean>(false);

   const handlerInput = (evt : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = evt.target.value;
      const validEmail = !emailPattern.test(value);
      setValidResetEmail(validEmail);
      setValuesResetEmail(value);
   };
   const handlerSubmit = (value: string) => () => {
      handlerSubmitResetPassword(value);
      setValuesResetEmail('');
   };

   const disabledButton = validResetEmail || !valuesResetEmail;

   return (
      <Dialog
         open={open}
         onClose={handleClose}
      >
         <DialogTitle>Subscribe</DialogTitle>
         <DialogContent>
            <DialogContentText>
               To reset password to this website, please enter your email address here.
            </DialogContentText>
            <TextField
               error={validResetEmail}
               helperText={validResetEmail ? 'Enter a valid email' : ''}
               onChange={handlerInput}
               value={valuesResetEmail}
               autoFocus
               required
               margin='dense'
               name='email'
               label='Email Address'
               type='email'
               fullWidth
               variant='standard'

            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlerSubmit(valuesResetEmail)} disabled={disabledButton}>Submit</Button>
         </DialogActions>
      </Dialog>
   );
};