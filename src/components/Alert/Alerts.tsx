import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import * as styles from './alerts.module.scss';
import { handlerAlerts } from '../../core/redux/slices/storeSlice';
import { useAppDispatch, useAppSelector } from '../../core/redux/hooks';

interface Props {

}
const getTitleByType = (type: string): string => {
   switch (type) {
         case 'success':
            return 'Success';
         case 'error':
            return 'Error';
         default:
            return '';
   }
};

export const Alerts: React.FC<Props> = () => {
   const [visible, setVisible] = useState(false);
   const alerts = useAppSelector(({ store }) => store.alerts);
   const { type , description, show } = alerts;
   const title = getTitleByType(alerts.type);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (show) {
         setVisible(true);
      }
      const timeoutId = setTimeout(() => {
         setVisible(false);
         dispatch(handlerAlerts(({ type: 'error', description: '', show: false })));
      }, 2000);

      return () => {
         clearTimeout(timeoutId);
      };
   }, [show]);

   return (
      <>
         {visible && <Alert severity={type} className={`${styles.position} ${visible ? styles.show : styles.hide}`} >
            <AlertTitle>{title}</AlertTitle>
            {description || 'Error error error'}
         </Alert>}
      </>
   );
};