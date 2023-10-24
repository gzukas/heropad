import * as React from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Outlet, useMatchRoute } from '@tanstack/react-router';
import { Theme, styled } from '@mui/material/styles';

const drawerWidth = 400;

const Content = styled('div', { shouldForwardProp: prop => prop !== 'shift' })<{
  shift?: boolean;
}>(({ theme, shift }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  pointerEvents: 'none',
  ['> *']: {
    pointerEvents: 'all'
  },
  ...(shift && {
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
}));

export interface AppCanvasProps {
  children?: React.ReactNode;
}

export function AppCanvas(props: AppCanvasProps) {
  const isMdUp = useMediaQuery<Theme>(theme => theme.breakpoints.up('md'));
  const matchRoute = useMatchRoute();
  const shift = !Boolean(matchRoute({ from: '/' }));

  return (
    <Box>
      <Content shift={shift}>{props.children}</Content>
      <Drawer
        open={shift}
        variant={isMdUp ? 'persistent' : 'temporary'}
        anchor="right"
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
      >
        <Outlet />
      </Drawer>
    </Box>
  );
}
