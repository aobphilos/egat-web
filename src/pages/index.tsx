import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch } from '../app/hooks';

import Plant from '../features/plant/Plant';
import { getPlantAsync } from '../features/plant/plantSlice';
import styles from '../styles/Home.module.css';

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  /**
   * Load Plant Data
   */
  dispatch(getPlantAsync());

  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo-rain.png" className={styles.logo} alt="logo" />
        <Plant />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a className={styles.link} href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>
          <span>, </span>
          <a className={styles.link} href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
            Redux
          </a>
          <span>, </span>
          <a className={styles.link} href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a className={styles.link} href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
};

export default IndexPage;
