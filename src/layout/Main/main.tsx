import React from 'react';
import { Outlet } from 'react-router-dom';
import * as commonStyles from '../../assets/styles/common.module.scss';
import * as styles from '../../app.module.scss';

interface Props {

}

export const Main: React.FC<Props> = () => {
   return (
      <main className={[commonStyles.container, styles.content].join(' ')}>
         <Outlet/>
      </main>
   );

};