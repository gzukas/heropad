import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';
import { Theme, styled, useColorScheme } from '@mui/material/styles';
import {
  useParams,
  rootRouteWithContext,
  Outlet
} from '@tanstack/react-router';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { useHydrateAndSyncAtoms } from '@heropad/base';
import {
  Camera,
  ChangeLocale,
  ChangeColorScheme,
  Search,
  Absolute,
  Sociogram
} from '~/components';
import { graphAtom, selectedNodeAtom } from '~/atoms';
import { AppRouterContext } from '~/router';

const drawerWidth = 400;

const Content = styled('div', { label: 'Content' })<{
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
  }),
  '.sigma-container': {
    width: '100dvw',
    height: '100dvh'
  },
  '.Sociogram-nodeHovered .sigma-mouse': {
    cursor: 'pointer'
  },
  ...(import.meta.env.DEV && {
    '.jotai-devtools-shell': { position: 'absolute' }
  })
}));

export const rootRoute = rootRouteWithContext<AppRouterContext>()({
  load: ({ context: { store } }) => store.get(graphAtom),
  component: function Root() {
    const { hero } = useParams({ from: '/$hero' });
    const { colorScheme } = useColorScheme();
    const isXs = useMediaQuery<Theme>(theme => theme.breakpoints.only('xs'));
    const isMdUp = useMediaQuery<Theme>(theme => theme.breakpoints.up('md'));

    useHydrateAndSyncAtoms([[selectedNodeAtom, hero]]);

    return (
      <Box>
        <Content shift={Boolean(hero)}>
          <Sociogram>
            <Camera
              component={Absolute}
              placement="bottom-right"
              gutters={24}
            />
          </Sociogram>
          <Stack
            component={Absolute}
            placement={isXs ? 'top' : 'top-right'}
            gap={1}
            direction="row"
            sx={theme => ({
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(0, 2),
              ...theme.mixins.toolbar
            })}
          >
            <Search />
            <ChangeLocale />
            <ChangeColorScheme />
          </Stack>
          <JotaiDevTools theme={colorScheme} />
        </Content>
        <Drawer
          open={Boolean(hero)}
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
});
