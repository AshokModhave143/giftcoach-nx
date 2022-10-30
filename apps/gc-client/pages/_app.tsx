import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './global.css';
import { Layout } from '../components/Layout';
import createEmotionCache from '../theme/createEmotionCache';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import React, { useState } from 'react';
import { ReactQueryDevToolsComponent } from '../components/ReactQueryDevTools';

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevToolsComponent />
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default GiftCoachApp;
