import { useRef } from 'react';
import { Outlet, RouteApi } from '@tanstack/react-router';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  AppBar,
  Badge,
  IconButton,
  ListItem,
  Paper,
  Slide,
  Stack,
  Tabs,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { HeroAvatar } from '~/components/HeroAvatar';
import { IconButtonLink } from '~/components/IconButtonLink';
import { ListItemAward } from '~/components/ListItemAward';
import { ListItemLink } from '~/components/ListItemLink';
import { useCamera } from '~/hooks/useCamera';
import { useMatchesChildRoute } from '~/hooks/useMatchesChildRoute';
import { HeroAwards } from './HeroAwards';
import { TabLink } from './TabLink';

const routeApi = new RouteApi({ id: '/$hero' });

export function Hero() {
  const { direction } = routeApi.useSearch();
  const { name, username } = routeApi.useLoaderData();
  const { _ } = useLingui();
  const awardsRef = useRef<HTMLElement>(null);
  const matchesChildRoute = useMatchesChildRoute();
  const camera = useCamera();

  const handleHeroClick = () => {
    camera.goto(username);
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
                <HeroAvatar hero={username} sx={{ width: 32, height: 32 }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
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
      <HeroAwards
        hero={username}
        direction={direction}
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
