import React from 'react';
import { Box, BoxProps, Button, useTheme } from '@mui/material';

export interface AppMenuProps extends BoxProps {
  menus: string[];
}

export const AppMenu: React.FC<AppMenuProps> = ({
  menus,
  ...props
}: AppMenuProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
      {...props}
    >
      {menus.map((menu) => (
        <Button
          key={menu}
          sx={{ my: 2, display: 'block', ':active': { fontWeight: 700 } }}
        >
          {menu}
        </Button>
      ))}
    </Box>
  );
};
