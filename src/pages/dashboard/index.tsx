import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/overall');
  }, [{}]);

  return (
    <div style={{ position: 'absolute', top: '48%', left: '45%' }}>
      <h2>Loading...</h2>
    </div>
  );
};

export default DashboardPage;
