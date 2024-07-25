import { Drawer, Stack, styled, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
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
import { Absolute } from '~/components/Absolute';
import { Sociogram } from '~/components/Sociogram/Sociogram';
import { useHydrateAndSyncAtoms } from '~/hooks/useHydrateAndSyncAtoms';
import { useAccumulatedContentShift } from '~/hooks/useAccumulatedContentShift';
import { usePrevious } from '~/hooks/usePrevious';
import { graphAtom } from '~/atoms/graphAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';
import type { AppRouterContext } from '~/router';

export const Route = createRootRouteWithContext<AppRouterContext>()({
  loader: ({ context: { store } }) => store.get(graphAtom),
  component: Root
});

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

function Root() {
  const { hero } = useParams({ strict: false });
  const isXs = useMediaQuery<Theme>(theme => theme.breakpoints.only('xs'));
  const isMdUp = useMediaQuery<Theme>(theme => theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const shift = useAccumulatedContentShift();
  const previousShift = usePrevious(shift);

  const handleDrawerClose = () => {
    navigate({ to: '/' });
  };

  useHydrateAndSyncAtoms([[selectedNodeAtom, hero]]);

  return (
    <Content
      style={{ '--Content-shift': `${shift}px` } as React.CSSProperties}
      sx={{
        '.sigma-container': {
          width: '100dvw',
          height: '100dvh'
        },
        '.Sociogram-nodeHovered .sigma-mouse': {
          cursor: 'pointer'
        }
      }}
    >
      <Sociogram>
        <Camera
          component={Absolute}
          placement="bottom-right"
          style={{ '--Absolute-gutters': '24px' } as React.CSSProperties}
        />
        <Drawer
          open={shift > 0}
          onClose={handleDrawerClose}
          variant={isMdUp ? 'persistent' : 'temporary'}
          anchor="right"
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: shift || previousShift
            }
          }}
        >
          <Outlet />
        </Drawer>
      </Sociogram>
      <Stack
        component={Absolute}
        placement={isXs ? 'top' : 'top-right'}
        gap={1}
        direction="row"
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          px: 2,
          ...theme.mixins.toolbar
        })}
      >
        <Search />
        <ChangeLocale />
        <ChangeColorScheme />
      </Stack>
    </Content>
  );
}
