import { Stack, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { Sociogram, SociogramProvider } from 'sociogram';
import { routerContext } from '~/routerContext';
import {
  Camera,
  ChangeLocale,
  ChangeColorScheme,
  Search,
  SociogramEvents,
  Absolute,
  AppCanvas
} from '~/components';
import { graphAtom } from '~/atoms';

const StyledSociogeram = styled(Sociogram)({
  '&, .sigma-container': {
    width: '100dvw',
    height: '100dvh'
  },
  '&.Sociogram-nodeHovered .sigma-mouse': {
    cursor: 'pointer'
  }
});

export const rootRoute = routerContext.createRootRoute({
  loader: ({ context: { store } }) => store.get(graphAtom),
  component: function Root() {
    const graph = useAtomValue(graphAtom);
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.only('xs'));

    return (
      <AppCanvas>
        <SociogramProvider graph={graph} theme={theme.palette.mode}>
          <StyledSociogeram>
            <SociogramEvents />
            <Camera
              component={Absolute}
              placement="bottom-right"
              gutters={24}
            />
          </StyledSociogeram>
        </SociogramProvider>

        <Stack
          component={Absolute}
          placement={matchesXs ? 'top' : 'top-right'}
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
      </AppCanvas>
    );
  }
});
