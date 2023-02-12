import React from 'react';
import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import { AppLogo } from './AppLogo';

export interface AppLogoWithTitleProps extends BoxProps {
  appName: string;
  onLogoClick?: () => void;
}

export const AppLogoWithTitle: React.FC<AppLogoWithTitleProps> = ({
  appName,
  onLogoClick,
  ...props
}: AppLogoWithTitleProps) => {
  const [primary, secondary] = appName.split(' ');
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      gap={1}
      justifyContent="flex-start"
      onClick={onLogoClick}
    >
      <AppLogo />

      <Typography
        variant="h4"
        color={theme.palette.text.primary}
        letterSpacing={2}
      >
        {primary}
        <strong>{secondary}</strong>
      </Typography>
    </Box>
  );
};
