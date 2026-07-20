import React from 'react';
import { Outlet } from 'react-router-dom';
import * as commonStyles from '@assets/styles/common.module.scss';
import * as styles from '../../app.module.scss';
import classNames from 'classnames';

export const Main: React.FC = () => {

   const combinedClasses = classNames(commonStyles.container, styles.content);

   return (
      <main className={combinedClasses}>
         <Outlet/>
      </main>
   );

};