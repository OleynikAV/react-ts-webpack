import React from 'react';
import {
   Box,
   Button,
   Link,
   TextField,
   Typography,
} from '@mui/material';
import { Facebook, GitHub, Google, LinkedIn } from '@mui/icons-material';
import * as styles from './authorization.module.scss';
import { User } from './types.auth';
import { ResetPassword } from './ResetPassword';

interface Props {
   isActive: boolean
   values: User
   handlerSetValue: (fld: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
   handlerSubmit: () => void
   handlerClickResetPassword: () => void
   open: boolean
   handleClose: () => void
   handlerSubmitResetPassword: (value: string) => void
   emailPattern: RegExp
}
export const Form: React.FC<Props> = (
   {
      isActive,
      handlerSetValue,
      values,
      handlerSubmit,
      handlerClickResetPassword,
      open,
      handleClose,
      handlerSubmitResetPassword,
      emailPattern,
   },
) => {
   const title = isActive ? 'Create Account' : 'Sign In';
   const description = isActive ? 'or use your email for registration' : 'or use your email and password';
   const disabledButton = values.emailValid || values.passwordValid || !values.password || !values.email;

   return (
      <Box className={[styles.formContainer, isActive ? styles.signUp : styles.signIn].join(' ')}>
         <form>
            <Typography variant={'h4'} component={'h1'}>{title}</Typography>
            <Box className={styles.socialIcons}>
               <Link href="#"><Google/></Link>
               <Link href="#"><Facebook/></Link>
               <Link href="#"><GitHub/></Link>
               <Link href="#"><LinkedIn/></Link>
            </Box>
            <Typography
               component={'span'}>{description}</Typography>
            <TextField
               error={values.emailValid}
               helperText={values.emailValid ? 'Enter a valid email' : ''}
               type="email"
               label="Email"
               variant="standard"
               color="secondary"
               onChange={handlerSetValue('email')}
               value={values.email}
               fullWidth
               required
            />
            <TextField
               error={values.passwordValid}
               helperText={values.passwordValid ? 'Password minimum 6 characters length' : ''}
               type="password"
               label="Password"
               variant="standard"
               color="secondary"
               onChange={handlerSetValue('password')}
               value={values.password}
               className={''}
               fullWidth
               required
            />
            {!isActive && <Link href="#" onClick={handlerClickResetPassword}>Forget Your Password?</Link>}
            <ResetPassword open={open} handleClose={handleClose} handlerSubmitResetPassword={handlerSubmitResetPassword} emailPattern={emailPattern} />
            <Button variant="contained" onClick={handlerSubmit} disabled={disabledButton}>{isActive ? 'Sign In' : 'Sign Up'}</Button>
         </form>
      </Box>
   );
};