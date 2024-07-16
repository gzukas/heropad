import { useRef } from 'react';
import { Link, Outlet, getRouteApi } from '@tanstack/react-router';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  AppBar,
  Badge,
  IconButton,
  ListItem,
  ListItemButton,
  Paper,
  Slide,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { HeroAvatar } from '~/components/HeroAvatar';
import { ListItemAward } from '~/components/ListItemAward';
import { useCamera } from '~/hooks/useCamera';
import { useMatchesChildRoute } from '~/hooks/useMatchesChildRoute';
import { HeroAwards } from './HeroAwards';

const routeApi = getRouteApi('/$hero');

export function Hero() {
  const { direction = 'received' } = routeApi.useSearch();
  const { hero, awardPaginationAtoms } = routeApi.useLoaderData();
  const { _ } = useLingui();
  const awardsRef = useRef<HTMLElement>(null);
  const matchesChildRoute = useMatchesChildRoute();
  const camera = useCamera();

  const handleHeroClick = () => {
    camera.goto(hero.username);
  };

  return (
    <>
      <AppBar
        position="relative"
        color="inherit"
        sx={{
          zIndex: 'appBar'
        }}
      >
        <Toolbar component={Stack} gap={2} direction="row">
          <Tooltip title={_(msg`Focus on me`)}>
            <IconButton onClick={handleHeroClick} edge="start">
              <Badge
                overlap="circular"
                badgeContent={<CenterFocusStrongIcon fontSize="small" />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <HeroAvatar
                  hero={hero.username}
                  sx={{ width: 32, height: 32 }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            {hero.name}
          </Typography>
          <IconButton
            component={Link}
            to="/"
            edge="end"
            aria-label={_(msg`Close`)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Tabs value={direction} variant="fullWidth">
          <Tab
            component={Link}
            label={_(msg`Received`)}
            value="received"
            to="/$hero"
            params={{ hero: hero.username }}
            search={{ direction: 'received' }}
          />
          <Tab
            component={Link}
            label={_(msg`Given`)}
            value="given"
            to="/$hero"
            params={{ hero: hero.username }}
            search={{ direction: 'given' }}
          />
        </Tabs>
      </AppBar>
      <HeroAwards
        ref={awardsRef}
        awardPaginationAtoms={awardPaginationAtoms}
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
              <ListItemButton
                component={Link}
                to="/$hero/$awardId"
                params={{ hero: hero.username, awardId: award.id }}
                search={prev => prev}
              >
                <ListItemAward award={award} />
              </ListItemButton>
            ) : (
              <ListItemAward loading />
            )}
          </ListItem>
        )}
      >
        <Slide
          appear={false}
          in={matchesChildRoute}
          container={awardsRef.current}
        >
          <Paper
            square
            sx={{
              position: 'sticky',
              top: 0
            }}
          >
            <Outlet />
          </Paper>
        </Slide>
      </HeroAwards>
    </>
  );
}
