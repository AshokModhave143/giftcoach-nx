import { Box, Typography } from '@mui/material';
import React from 'react';
import { BackgroundImage } from '@giftcoach/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomeProps {}

export const Welcome: React.FC<WelcomeProps> = (props: WelcomeProps) => {
  return (
    <BackgroundImage>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <Typography variant="h1">Welcome to Gift Coach</Typography>
        <Typography variant="h4">
          We will help you make your celebration spectacular
        </Typography>
      </Box>
    </BackgroundImage>
  );
};
