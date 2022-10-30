import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import theme from '../theme/theme';

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
    <header id="header">
      <div style={{ height: '56px', background: theme.palette.primary.dark }}>
        <Typography variant="h4" color="white">
          Gift Coach
        </Typography>
      </div>
    </header>
    <main>{children}</main>
  </Box>
);
