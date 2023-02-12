import React from 'react';
import { CardGiftcard } from '@mui/icons-material';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';

/* eslint-disable-next-line */
export interface AppLogoProps extends IconButtonProps {}

export const AppLogo: React.FC<AppLogoProps> = (props: AppLogoProps) => {
  const theme = useTheme();

  return (
    <IconButton {...props}>
      <CardGiftcard
        fontSize="large"
        sx={{ fill: theme.palette.primary.main }}
      />
    </IconButton>
  );
};
