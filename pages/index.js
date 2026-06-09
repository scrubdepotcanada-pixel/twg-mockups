import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace('/admin'); }, []);
  return (
    <>
      <Head><title>TWG Mockups</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#555', fontFamily: 'system-ui' }}>Redirecting...</p>
      </div>
    </>
  );
}
