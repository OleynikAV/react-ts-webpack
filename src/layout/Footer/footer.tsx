import * as commonStyles from '../../assets/styles/common.module.scss';
import * as styles from './footer.module.scss';
import React from 'react';
const Footer: React.FC = () =>  {
   return (
      <footer className={styles.footer}>
         <div className={commonStyles.container}>
            <h2>Footer</h2>
         </div>
      </footer>
   );
};

export default Footer;
