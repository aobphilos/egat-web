import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/overview');
  }, [{}]);

  return (
    <div style={{ position: 'absolute', top: '48%', left: '45%' }}>
      <ProgressSpinner />
    </div>
  );
};

export default IndexPage;
