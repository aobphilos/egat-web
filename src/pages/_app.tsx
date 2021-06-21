import PrimeReact from 'primereact/api';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import '../styles/globals.css';
import store from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {
  PrimeReact.ripple = true;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
