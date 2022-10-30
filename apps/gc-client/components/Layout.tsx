import { AppBar, Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const title = 'Gift Coach';
const description = 'A gift for loved ones';
const siteTitle = 'GC: Love for loved ones';

export interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box minHeight="100vh">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={siteTitle} />
    </Head>
    <AppBar />
    <header id="header">
      <div style={{ height: '56px', background: '#3F3B6C' }}>
        <h1>Gift Coach</h1>
      </div>
    </header>
    <main>{children}</main>
  </Box>
);
