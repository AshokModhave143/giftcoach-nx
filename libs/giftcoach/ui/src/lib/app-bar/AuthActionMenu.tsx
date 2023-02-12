import React from 'react';
import { Box, BoxProps, Button, useTheme } from '@mui/material';

/* eslint-disable-next-line */
export interface AuthActionMenuProps extends BoxProps {
  onSignUp?: () => void;
}

export const AuthActionMenu: React.FC<AuthActionMenuProps> = ({
  onSignUp,
  ...props
}: AuthActionMenuProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center' }}
      columnGap={1}
      {...props}
    >
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
