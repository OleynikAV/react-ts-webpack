import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import {
   createUserWithEmailAndPassword,
   getAuth,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToggleForm } from './ToggleForm';
import * as styles from './authorization.module.scss';
import { Form } from './Form';
import { User } from './types.auth';
import { useLocalStorage } from 'usehooks-ts';
import { handlerAlerts, handlerPreloader } from '../../core/redux/slices/storeSlice';
import { Error } from '../../firebase/types.firebase';
import { useAppDispatch } from '../../core/redux/hooks';
import { MESSAGES } from '../../assets/messages/messages';

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-z]{2,7}$/;

interface Props {
}

export const Authorization: React.FC<Props> = () => {
   const navigate = useNavigate();
   const auth = getAuth();
   const dispatch = useAppDispatch();

   const [isActive, setIsActive] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);

   const [isAuth, setAuth] = useLocalStorage<string>('isAuth', '');


   const [userSignIn, setUserSignIn] = useState<User>({
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
   });

   const [usersSignUp, setUserSignUp] = useState<User>({
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
   });

   const handlerClickResetPassword = () => {
      setOpen(true);

   };
   const handlerSubmitResetPassword =  async (value : string) : Promise<void>   =>  {
      dispatch(handlerPreloader(true));
      try {
         await sendPasswordResetEmail(auth, value);
         dispatch(handlerAlerts(({ type: 'success', description: MESSAGES.passwordResetSuccessMessage, show: true })));
         setOpen(false);
      } catch (error: unknown) {
         const { code = '', message = '' } = error as Error;
         dispatch(handlerPreloader(false));
         dispatch(handlerAlerts(({ type: 'error', description: message + code, show: true })));
      } finally {
         dispatch(handlerPreloader(false));
      }
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handlerClick = () => {
      setIsActive((prevState) => !prevState);
   };

   const handlerSetValue = (fld: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = evt.target.value;
      const setValueState = isActive ? setUserSignIn : setUserSignUp;
      setValueState((prevState): User => ({ ...prevState, [fld]: value, [fld + 'Valid']: fld === 'email' ? !emailPattern.test(value) : value.length < 6  }));
      if (!value) {
         setValueState((prevState) : User => ({ ...prevState, [fld + 'Valid']: false }));
         return;
      }
   };
   const handlerSubmit = async (): Promise<void> => {
      const values = isActive ? userSignIn : usersSignUp;
      const { email, password } = values;
      dispatch(handlerPreloader(true));

      try {
         const authMethod = isActive ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
         const { user: { uid } } = await authMethod(auth, email, password);
         setAuth(uid);
         dispatch(handlerAlerts(({ type: 'success', description: isActive ? MESSAGES.welcomeMessage : MESSAGES.successLoginMessage, show: true })));
         navigate('/');
         dispatch(handlerPreloader(false));
      } catch (error: unknown) {
         const { code = '', message = '' } = error as Error;
         dispatch(handlerPreloader(false));
         dispatch(handlerAlerts(({ type: 'error', description: message + code, show: true })));
      } finally {
         dispatch(handlerPreloader(false));
      }
   };

   useEffect(() => {

   }, [isActive,isAuth]);
   useEffect(() => {

   }, []);

   return (
      <Box className={styles.containerBody}>

         <Box className={[styles.container, isActive ? styles.active : ''].join(' ')}>
            <Form
               isActive={isActive}
               values={isActive ? userSignIn : usersSignUp}
               handlerSetValue={handlerSetValue}
               handlerSubmit={handlerSubmit}
               handlerClickResetPassword={handlerClickResetPassword}
               open={open}
               handleClose={handleClose}
               handlerSubmitResetPassword={handlerSubmitResetPassword}
               emailPattern={emailPattern}
            />
            <ToggleForm
               handlerClick={handlerClick}
               isActive={isActive}
            />
         </Box>
      </Box>
   );
};