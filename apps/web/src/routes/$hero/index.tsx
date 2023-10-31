import {
  AppBar,
  IconButton,
  Stack,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Route } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import { useAtomValue } from 'jotai';
import { ScopeProvider } from 'bunshi/react';
import { HeroAvatar } from '~/components';
import { HeroAwards, TabLink } from './components';
import { HeroScope, DirectionScope } from './scopes';
import { heroFamily } from './atoms/heroFamily';
import { rootRoute } from '../root';

const heroSearchSchema = z.object({
  direction: z.enum(['received', 'given']).catch('received')
});

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  wrapInSuspense: true,
  validateSearch: heroSearchSchema,
  loader: ({ params, context: { store } }) => {
    return store.get(heroFamily(params.hero));
  },
  component: function Hero({ useParams, useSearch }) {
    const { hero } = useParams();
    const { direction } = useSearch();
    const { username, name } = useAtomValue(heroFamily(hero));

    return (
      <ScopeProvider scope={HeroScope} value={username}>
        <AppBar position="relative" color="inherit">
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
          <HeroAwards />
        </ScopeProvider>
      </ScopeProvider>
    );
  }
});
