import { Drawer, Stack, useMediaQuery } from '@mui/material';
import { Theme, styled, useColorScheme } from '@mui/material/styles';
import {
  useParams,
  rootRouteWithContext,
  Outlet,
  useNavigate
} from '@tanstack/react-router';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
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

const Content = styled('div', { label: 'Content' })<{
  shift?: number;
}>(({ theme, shift }) => ({
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(shift && {
    [theme.breakpoints.up('md')]: {
      marginRight: shift,
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
  loader: ({ context: { store } }) => store.get(graphAtom),
  component: function Root() {
    const { hero } = useParams({ from: '/$hero', strict: true });
    const { colorScheme } = useColorScheme();
    const isXs = useMediaQuery<Theme>(theme => theme.breakpoints.only('xs'));
    const isMdUp = useMediaQuery<Theme>(theme => theme.breakpoints.up('md'));
    const navigate = useNavigate();
    const shiftContentBy = useAccumulatedContentShift();
    const previousShiftContentBy = usePrevious(shiftContentBy);

    const handleDrawerClose = () => {
      navigate({ to: '/' });
    };

    useHydrateAndSyncAtoms([[selectedNodeAtom, hero]]);

    return (
      <Content shift={shiftContentBy}>
        <Sociogram>
          <Camera component={Absolute} placement="bottom-right" gutters={24} />
          <Drawer
            open={shiftContentBy > 0}
            onClose={handleDrawerClose}
            variant={isMdUp ? 'persistent' : 'temporary'}
            anchor="right"
            PaperProps={{
              sx: {
                width: shiftContentBy || previousShiftContentBy
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
        <JotaiDevTools theme={colorScheme} />
      </Content>
    );
  }
});
