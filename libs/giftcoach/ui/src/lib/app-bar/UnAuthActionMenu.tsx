import React from 'react';
import { Box, BoxProps, Button, useTheme } from '@mui/material';

/* eslint-disable-next-line */
export interface UnAuthActionMenuProps extends BoxProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

export const UnAuthActionMenu: React.FC<UnAuthActionMenuProps> = ({
  onLogin,
  onSignUp,
  ...props
}: UnAuthActionMenuProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center' }}
      columnGap={1}
      {...props}
    >
      <Button
        variant="outlined"
        key="sign-in"
        sx={{
          borderColor: theme.palette.action.disabled,
          borderWidth: 1,
          color: theme.palette.action.active,
        }}
        onClick={onLogin}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        key="sign-up"
        sx={{
          borderColor: theme.palette.action.disabled,
          borderWidth: 1,
          color: theme.palette.action.active,
        }}
        onClick={onSignUp}
      >
        SIGN UP
      </Button>
    </Box>
  );
};
