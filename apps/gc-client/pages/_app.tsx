import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import './global.css';
import { Layout } from '../components/Layout';
import createEmotionCache from '../theme/createEmotionCache';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

const clientSideEmotionCache = createEmotionCache();

export interface GiftCoachApp extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: any;
}

function GiftCoachApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: GiftCoachApp) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default GiftCoachApp;
