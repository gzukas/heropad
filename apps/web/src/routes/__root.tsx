import { Suspense, useRef } from 'react';
import { Box, Drawer, Stack, styled, useMediaQuery } from '@mui/material';
import {
  useParams,
  Outlet,
  useNavigate,
  createRootRouteWithContext
} from '@tanstack/react-router';
import { Camera } from '~/components/Camera';
import { ChangeLocale } from '~/components/ChangeLocale';
import { ChangeColorScheme } from '~/components/ChangeColorScheme';
import { Search } from '~/components/Search/Search';
import { Sociogram } from '~/components/Sociogram/Sociogram';
import { useHydrateAndSyncAtoms } from '~/hooks/useHydrateAndSyncAtoms';
import { useAccumulatedContentShift } from '~/hooks/useAccumulatedContentShift';
import { graphAtom } from '~/atoms/graphAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';
import type { AppRouterContext } from '~/router';

const Content = styled('div', { label: 'Content' })(({ theme }) => ({
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.up('md')]: {
    marginRight: 'var(--Content-shift, 0)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

export const Route = createRootRouteWithContext<AppRouterContext>()({
  loader: ({ context: { store } }) => store.get(graphAtom),
  component: Root
});

function Root() {
  const hero = useParams({ strict: false, select: params => params.hero });
  const contentRef = useRef<HTMLDivElement>(null);
  const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const shift = useAccumulatedContentShift();
  const navigate = useNavigate();

  const drawerWidth = isXs ? '100dvw' : shift;

  const handleDrawerClose = () => {
    navigate({ to: '/' });
  };

  useHydrateAndSyncAtoms([[selectedNodeAtom, hero]]);

  return (
    <Content
      ref={contentRef}
      style={{ '--Content-shift': `${shift}px` } as React.CSSProperties}
    >
      <Sociogram
        sx={{
          width: '100dvw',
          height: '100dvh'
        }}
      />
      <Stack
        spacing={1}
        sx={theme => ({
          position: 'absolute',
          top: theme.spacing(1.5),
          right: theme.spacing(2),
          bottom: theme.spacing(1.5),
          justifyContent: 'center',
          pointerEvents: 'none',
          button: {
            pointerEvents: 'all'
          }
        })}
      >
        <ChangeColorScheme />
        <ChangeLocale />
        {!isXs && <Box sx={{ flexGrow: 1 }} />}
        <Camera />
      </Stack>
      <Suspense>
        <Drawer
          open={shift > 0}
          onClose={handleDrawerClose}
          variant={isMdUp ? 'persistent' : 'temporary'}
          elevation={1}
          anchor="right"
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerWidth
            }
          }}
        >
          <Outlet />
        </Drawer>
      </Suspense>
      <Stack
        direction="row"
        sx={theme => ({
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          ...theme.mixins.toolbar,
          ...(isXs && {
            right: 0
          })
        })}
      >
        <Search />
      </Stack>
    </Content>
  );
}
