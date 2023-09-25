import { RootRoute } from '@tanstack/react-router';
import { Stack } from '@mui/material';
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

    return (
      <AppCanvas>
        <SociogramProvider graph={graph} theme={theme.palette.mode}>
          <StyledSociogeram>
            <SociogramEvents />
            <Absolute position="bottomRight" gutters={24}>
              <Camera />
            </Absolute>
          </StyledSociogeram>
        </SociogramProvider>
        <Absolute
          position="topRight"
          sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 2),
            ...theme.mixins.toolbar
          })}
        >
          <Stack gap={1} direction="row">
            <Search />
            <ChangeLocale />
            <ChangeColorScheme />
          </Stack>
        </Absolute>
      </AppCanvas>
    );
  }
});
