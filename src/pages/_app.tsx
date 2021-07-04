import React from 'react';
import type { AppProps } from 'next/app';
import PrimeReact from 'primereact/api';
import { Provider } from 'react-redux';

import store from '../app/store';
import Wrapper from '../features/layout/Wrapper';

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import '../layout/flags/flags.css';
import '../layout/layout.scss';
// import '../styles/globals.css';
// import '../styles/Wrapper.scss';

function MyApp({ Component, pageProps }: AppProps) {
  PrimeReact.ripple = true;

  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}

export default MyApp;
