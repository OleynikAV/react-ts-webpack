import * as styles from './page404.module.scss';
import React from 'react';
import images from '../../assets/images/404.jpg';

const Page404: React.FC = () => {
   return  (
      <img src={images} alt='404' className={styles.sizeImages}/>
   );

};
export default Page404;
