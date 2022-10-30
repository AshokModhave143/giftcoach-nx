import { AppProps } from 'next/app';
import './global.css';
import { Layout } from '../components/Layout';

function GiftCoachApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default GiftCoachApp;
