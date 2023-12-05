import { Suspense, useRef } from 'react';
import { Outlet, useParams, useSearch } from '@tanstack/react-router';
import { ScopeProvider } from 'bunshi/react';
import { msg } from '@lingui/macro';
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
import { HeroAvatar } from '~/components/HeroAvatar';
import { IconButtonLink } from '~/components/IconButtonLink';
import { ListItemAward } from '~/components/ListItemAward';
import { ListItemLink } from '~/components/ListItemLink';
import { UseAtomValue } from '~/components/UseAtomValue';
import { heroFamily } from '~/atoms/heroFamily';
import { useMatchesChildRoute } from '~/hooks/useMatchesChildRoute';
import { DirectionScope, HeroScope } from '../scopes';
import { heroRoute } from '..';
import { HeroAwards } from './HeroAwards';
import { TabLink } from './TabLink';
import { useLingui } from '@lingui/react';

export function Hero() {
  const { _ } = useLingui();
  const { direction } = useSearch({ from: heroRoute.id });
  const { hero } = useParams({ from: heroRoute.id });
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
          <IconButtonLink to="/" edge="end" aria-label={_(msg`Close`)}>
            <CloseIcon />
          </IconButtonLink>
        </Toolbar>
        <Tabs value={direction} variant="fullWidth">
          <TabLink
            label={_(msg`Received`)}
            value="received"
            to="/$hero"
            params={prev => prev}
            search={{ direction: 'received' }}
          />
          <TabLink
            label={_(msg`Given`)}
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
