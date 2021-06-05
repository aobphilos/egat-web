import PrimeReact from 'primereact/api';
import type { AppProps } from 'next/app';

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  PrimeReact.ripple = true;
  return <Component {...pageProps} />;
}

export default MyApp;
