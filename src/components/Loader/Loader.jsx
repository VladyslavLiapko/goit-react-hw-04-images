import React from 'react'
import { InfinitySpin } from 'react-loader-spinner';


import styles from './Loader.module.scss';

 export const Loader = () => (
<div className={styles.Loader}>
    <InfinitySpin 
      width='200'
      color="#4fa94d"
    />
  </div>
);

