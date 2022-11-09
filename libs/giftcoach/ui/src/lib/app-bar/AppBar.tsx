import React from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { CardGiftcard } from '@mui/icons-material';

export interface AppBarProps extends MuiAppBarProps {
  appName: string;
}

export const AppBar: React.FC<AppBarProps> = ({
  appName,
  ...props
}: AppBarProps) => {
  return (
    <MuiAppBar sx={{ height: 76 }} position="static" {...props}>
      <Toolbar>
        <IconButton
          sx={{
            mr: 2,
            px: 2,
            borderRadius: '50%',
            border: '1px solid pink',
            bgcolor: 'darkorange',
          }}
        >
          <CardGiftcard fontSize="large" color="secondary" />
        </IconButton>
        <Typography variant="h4">{appName}</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
