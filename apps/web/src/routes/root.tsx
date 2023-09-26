import { RootRoute } from '@tanstack/react-router';
import { Stack, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { Sociogram, SociogramProvider } from 'sociogram';
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

export const rootRoute = new RootRoute({
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
