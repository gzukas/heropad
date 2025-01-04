import { useRef } from 'react';
import { Outlet, getRouteApi } from '@tanstack/react-router';
import { useLingui } from '@lingui/react/macro';
import {
  AppBar,
  Badge,
  IconButton,
  ListItem,
  Paper,
  Slide,
  Stack,
  styled,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import SortIcon from '@mui/icons-material/Sort';
import { useCamera } from '~/hooks/useCamera';
import { useMatchesChildRoute } from '~/hooks/useMatchesChildRoute';
import { ListItemButtonLink } from '~/components/ListItemButtonLink';
import { IconButtonLink } from '~/components/IconButtonLink';
import { TabLink } from '~/components/TabLink';
import { HeroAvatar } from '~/components/HeroAvatar';
import { HeroAwards } from './HeroAwards';
import { ListItemAward } from './ListItemAward';

const FlippedSortIcon = styled(SortIcon)({
  transform: 'scaleY(-1)'
});

const routeApi = getRouteApi('/(hero)/$hero');

export function HeroProfile() {
  const { direction = 'received', sort = '-givenAt' } = routeApi.useSearch({
    select: ({ direction, sort }) => ({ direction, sort })
  });
  const { hero, awardPaginationAtoms } = routeApi.useLoaderData();
  const { t } = useLingui();
  const awardsRef = useRef<HTMLElement>(null);
  const matchesChildRoute = useMatchesChildRoute();
  const camera = useCamera();
  const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

  const isSortDesc = sort === '-givenAt';

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
        <Toolbar component={Stack} gap={1.25} direction="row">
          <IconButtonLink to="/" edge="start" aria-label={t`Close`}>
            {isXs ? <ArrowBackIcon /> : <CloseIcon />}
          </IconButtonLink>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            {hero.name}
          </Typography>
          <Tooltip
            title={isSortDesc ? t`Show oldest first` : t`Show latest first`}
          >
            <IconButtonLink
              to="/$hero"
              params={{ hero: hero.username }}
              search={params => ({
                ...params,
                sort: isSortDesc ? 'givenAt' : '-givenAt'
              })}
            >
              {isSortDesc ? <FlippedSortIcon /> : <SortIcon />}
            </IconButtonLink>
          </Tooltip>
          <Tooltip title={t`Focus on me`}>
            <IconButton onClick={handleHeroClick} edge="end">
              <Badge
                overlap="circular"
                badgeContent={<CenterFocusStrongIcon fontSize="small" />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <HeroAvatar
                  hero={hero.username}
                  sx={{ width: 28, height: 28 }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Tabs value={direction} variant="fullWidth">
          <TabLink
            label={t`Received`}
            value="received"
            to="/$hero"
            params={{ hero: hero.username }}
            search={search => ({ ...search, direction: 'received' })}
          />
          <TabLink
            label={t`Given`}
            value="given"
            to="/$hero"
            params={{ hero: hero.username }}
            search={search => ({ ...search, direction: 'given' })}
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
              <ListItemButtonLink
                to="/$hero/$awardId"
                params={{ hero: hero.username, awardId: award.id }}
                search={prev => prev}
              >
                <ListItemAward award={award} />
              </ListItemButtonLink>
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
