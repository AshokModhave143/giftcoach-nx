import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  DehydratedState,
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
import { IntlProvider } from 'react-intl';
import { ReactQueryDevToolsComponent } from '../components/ReactQueryDevTools';

const clientSideEmotionCache = createEmotionCache();

export interface PageProps {
  dehydratedState: DehydratedState;
}
export interface GiftCoachApp extends AppProps<PageProps> {
  emotionCache?: EmotionCache;
}

function GiftCoachApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: GiftCoachApp) {
  const { dehydratedState } = pageProps;
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
          <Hydrate state={dehydratedState}>
            <IntlProvider locale="en">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </IntlProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default GiftCoachApp;
