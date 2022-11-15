import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme();

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  locale: 'en',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
