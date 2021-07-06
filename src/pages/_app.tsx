import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import PrimeReact from 'primereact/api';
import { Provider } from 'react-redux';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import Auth from '../features/auth';

import store from '../app/store';
import Wrapper from '../features/layout/Wrapper';

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import '../layout/flags/flags.css';
import '../layout/layout.scss';

function MyApp({ Component, pageProps }: AppProps) {
  PrimeReact.ripple = true;
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.update({ password: 'P@ssw0rd' });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Provider store={store}>
      {!session ? (
        <Auth />
      ) : (
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      )}
    </Provider>
  );
}

export default MyApp;
