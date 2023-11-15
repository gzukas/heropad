import { Suspense, useRef } from 'react';
import {
  AppBar,
  Avatar,
  ListItem,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Outlet, Route } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import { ScopeProvider } from 'bunshi/react';
import { heroFamily } from '~/atoms';
import {
  HeroAvatar,
  IconButtonLink,
  ListItemAward,
  ListItemLink,
  UseAtomValue
} from '~/components';
import { useMatchesChildRoute } from '~/hooks';
import { rootRoute } from '../root';
import { HeroAwards, TabLink } from './components';
import { HeroScope, DirectionScope } from './scopes';

const heroSearchSchema = z.object({
  direction: z.enum(['received', 'given']).nullish().catch('received')
});

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  validateSearch: heroSearchSchema,
  component: function Hero({ useParams, useSearch }) {
    const { direction } = useSearch();
    const { hero } = useParams();
    const awardsRef = useRef<HTMLElement>(null);
    const matchesChildRoute = useMatchesChildRoute();

    return (
      <ScopeProvider scope={HeroScope} value={hero}>
        <AppBar
          position="relative"
          color="inherit"
          sx={theme => ({
            zIndex: theme.zIndex.appBar
          })}
        >
          <Toolbar
            component={Stack}
            gap={2}
            direction="row"
            disableGutters
            sx={{ pl: 2, pr: 3 }}
          >
            <Suspense
              key={hero}
              fallback={
                <>
                  <Skeleton variant="circular" animation="wave">
                    <Avatar />
                  </Skeleton>
                  <Skeleton animation="wave" sx={{ flexGrow: 1, height: 32 }} />
                </>
              }
            >
              <UseAtomValue atom={heroFamily(hero)}>
                {({ name, username }) => (
                  <>
                    <HeroAvatar hero={username} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {name}
                    </Typography>
                  </>
                )}
              </UseAtomValue>
            </Suspense>
            <IconButtonLink to="/" edge="end">
              <CloseIcon />
            </IconButtonLink>
          </Toolbar>
          <Tabs value={direction} variant="fullWidth">
            <TabLink
              label={<Trans>Received</Trans>}
              value="received"
              to="/$hero"
              params={prev => prev}
              search={{ direction: 'received' }}
            />
            <TabLink
              label={<Trans>Given</Trans>}
              value="given"
              to="/$hero"
              params={prev => prev}
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
                    params={prev => ({ ...prev, awardId: award.id })}
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
