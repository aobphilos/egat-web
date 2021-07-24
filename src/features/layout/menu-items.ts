import { supabase } from '../../utils/supabaseClient';

export default [
  { label: 'Overview', icon: 'pi pi-fw pi-home', to: '/' },
  { label: 'Dashboard', icon: 'pi pi-fw pi-th-large', to: '/dashboard' },
  { label: 'Location', icon: 'pi pi-fw pi-globe', to: '/location' },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-sign-out',
    to: '/',
    command: () => supabase.auth.signOut(),
  },
];
