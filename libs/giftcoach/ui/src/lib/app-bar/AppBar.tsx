import React from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  useTheme,
} from '@mui/material';
import { AppLogoWithTitle } from './AppLogoWithTitle';
import { AppMenu } from './AppMenu';
import { UnAuthActionMenu } from './UnAuthActionMenu';

export interface AppBarProps extends MuiAppBarProps {
  appName: string;
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const pages = ['Products', 'Pricing', 'Blog'];

export const AppBar: React.FC<AppBarProps> = ({
  appName,
  onLoginClick,
  onSignUpClick,
  onLogoClick,
  ...props
}: AppBarProps) => {
  const theme = useTheme();

  return (
    <MuiAppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingX: theme.spacing(2),
        height: theme.spacing(12),
        backgroundColor: theme.palette.background.paper,

        overflowY: 'auto',
      }}
      position="static"
      {...props}
    >
      <Toolbar
        disableGutters
        sx={{
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* Left */}
        <AppLogoWithTitle appName={appName} onLogoClick={onLogoClick} />

        {/* Menu */}
        <AppMenu menus={pages} />

        {/* Right button */}
        <UnAuthActionMenu
          {...{ onLogin: onLoginClick, onSignUp: onSignUpClick }}
        />
      </Toolbar>
    </MuiAppBar>
  );
};
