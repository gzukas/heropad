import { useRef } from 'react';
import {
  AppBar,
  IconButton,
  ListItem,
  Paper,
  Slide,
  Stack,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Outlet, Route } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import { ScopeProvider } from 'bunshi/react';
import { HeroAvatar, ListItemAward, ListItemLink } from '~/components';
import { useMatchesChildRoute } from '~/hooks';
import { HeroAwards, TabLink } from './components';
import { HeroScope, DirectionScope } from './scopes';
import { heroFamily } from '../../atoms/heroFamily';
import { rootRoute } from '../root';

const heroSearchSchema = z.object({
  direction: z.enum(['received', 'given']).nullish().catch('received')
});

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  wrapInSuspense: false,
  validateSearch: heroSearchSchema,
  loader: ({ params, context: { store } }) => {
    return store.get(heroFamily(params.hero));
  },
  component: function Hero({ useSearch, useLoader }) {
    const { direction } = useSearch();
    const { name, username } = useLoader();
    const awardsRef = useRef<HTMLElement>(null);
    const matchesChildRoute = useMatchesChildRoute();

    return (
      <ScopeProvider scope={HeroScope} value={username}>
        <AppBar
          position="relative"
          color="inherit"
          sx={theme => ({
            zIndex: theme.zIndex.appBar
          })}
        >
          <Toolbar component={Stack} gap={2} direction="row">
            <HeroAvatar sx={{ marginLeft: -0.75 }} hero={username} />
            <Typography sx={{ flex: 1 }} variant="h6" noWrap>
              {name}
            </Typography>
            <IconButton edge="end" component={Link as any} to="/">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Tabs value={direction} variant="fullWidth">
            <TabLink
              label={<Trans>Received</Trans>}
              value="received"
              to="/$hero"
              params={{ hero: username }}
              search={{ direction: 'received' }}
            />
            <TabLink
              label={<Trans>Given</Trans>}
              value="given"
              to="/$hero"
              params={{ hero: username }}
              search={{ direction: 'given' }}
            />
          </Tabs>
        </AppBar>
        <ScopeProvider scope={DirectionScope} value={direction}>
          <HeroAwards
            key={direction}
            ref={awardsRef}
            virtualizerOptions={{
              paddingStart: matchesChildRoute ? 72 : 0
            }}
            renderAward={({ award, virtualAward }, props) => (
              <ListItem
                key={virtualAward.index}
                disablePadding={Boolean(award)}
                {...props}
              >
                {award ? (
                  <ListItemLink
                    to="/$hero/$awardId"
                    params={params => ({ ...params, awardId: award.id })}
                    search={prev => prev}
                  >
                    <ListItemAward award={award} />
                  </ListItemLink>
                ) : (
                  <ListItemAward loading />
                )}
              </ListItem>
            )}
          >
            <Slide
              appear={false}
              direction="down"
              in={matchesChildRoute}
              container={awardsRef.current}
            >
              <Paper
                square
                variant="outlined"
                sx={{
                  position: 'sticky',
                  top: 0,
                  width: '100%',
                  borderWidth: 0,
                  borderBottomWidth: 1
                }}
              >
                <Outlet />
              </Paper>
            </Slide>
          </HeroAwards>
        </ScopeProvider>
      </ScopeProvider>
    );
  }
});
