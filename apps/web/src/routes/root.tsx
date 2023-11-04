import { Box, Stack, useMediaQuery } from '@mui/material';
import { Theme, useColorScheme } from '@mui/material/styles';
import { useParams } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { Sociogram } from '@heropad/sociogram';
import { routerContext } from '~/routerContext';
import {
  Camera,
  ChangeLocale,
  ChangeColorScheme,
  Search,
  SociogramEvents,
  SociogramSettings,
  Absolute,
  AppCanvas
} from '~/components';
import { graphAtom } from '~/atoms';

export const rootRoute = routerContext.createRootRoute({
  loader: ({ context: { store } }) => store.get(graphAtom),
  component: function Root() {
    const { hero } = useParams({ from: '/$hero' });
    const { colorScheme } = useColorScheme();
    const isXs = useMediaQuery<Theme>(theme => theme.breakpoints.only('xs'));
    const graph = useAtomValue(graphAtom);

    return (
      <AppCanvas>
        <Box
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
          <Sociogram graph={graph} theme={colorScheme} selectedNode={hero}>
            <SociogramEvents />
            <SociogramSettings />
            <Camera
              component={Absolute}
              placement="bottom-right"
              gutters={24}
            />
          </Sociogram>
        </Box>
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
      </AppCanvas>
    );
  }
});
