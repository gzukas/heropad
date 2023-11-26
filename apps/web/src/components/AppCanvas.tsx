import { Box, BoxProps, Drawer, useMediaQuery } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { Outlet } from '@tanstack/react-router';

const drawerWidth = 400;

const Content = styled('div', { shouldForwardProp: prop => prop !== 'shift' })<{
  shift?: boolean;
}>(({ theme, shift }) => ({
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(shift && {
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
}));

export interface AppCanvasProps extends BoxProps {
  shift?: boolean;
}

export function AppCanvas(props: AppCanvasProps) {
  const { shift, children, ...other } = props;
  const isMdUp = useMediaQuery<Theme>(theme => theme.breakpoints.up('md'));

  return (
    <Box {...other}>
      <Content shift={shift}>{children}</Content>
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
