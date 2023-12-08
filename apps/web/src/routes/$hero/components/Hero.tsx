import { useRef } from 'react';
import { Outlet, useSearch } from '@tanstack/react-router';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  AppBar,
  ListItem,
  Paper,
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
import { useMatchesChildRoute } from '~/hooks/useMatchesChildRoute';
import { heroRoute } from '..';
import { HeroAwards } from './HeroAwards';
import { TabLink } from './TabLink';

export function Hero() {
  const { _ } = useLingui();
  const { direction } = useSearch({ from: heroRoute.id });
  const { name, username } = heroRoute.useLoaderData();
  const awardsRef = useRef<HTMLElement>(null);
  const matchesChildRoute = useMatchesChildRoute();

  return (
    <>
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
          <HeroAvatar hero={username} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
    </>
  );
}
