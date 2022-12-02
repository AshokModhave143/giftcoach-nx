import React from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { CardGiftcard } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';

export interface AppBarProps extends MuiAppBarProps {
  appName: string;
}

const pages = ['Products', 'Pricing', 'Blog'];

export const AppBar: React.FC<AppBarProps> = ({
  appName,
  ...props
}: AppBarProps) => {
  return (
    <MuiAppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 105,
        backgroundColor: 'white',
      }}
      position="static"
      {...props}
    >
      <Toolbar disableGutters>
        {/* Left */}
        <Box
          display="inline-flex"
          alignItems="center"
          gap={1}
          justifyContent="flex-start"
        >
          <IconButton>
            <CardGiftcard fontSize="large" sx={{ fill: 'red' }} />
          </IconButton>

          <Typography variant="h4" color="black" letterSpacing={2}>
            <TitleComponent appName={appName} />
          </Typography>
        </Box>

        {/* Middle menu */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, display: 'block', ':active': { fontWeight: 700 } }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Right button */}
        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            key="sign-up"
            sx={{ borderColor: 'red', borderWidth: 1, color: 'black' }}
          >
            SIGN UP FREE
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

const TitleComponent: React.FC<{ appName: string }> = ({ appName }) => {
  const [primary, secondary] = appName.split(' ');
  return (
    <FormattedMessage
      id="giftcoach.title"
      defaultMessage="{primary}<strong>{secondary}</strong>"
      values={{
        strong: (value: string) => <strong>{value}</strong>,
        primary,
        secondary,
      }}
    />
  );
};
