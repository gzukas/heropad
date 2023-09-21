import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Route, useNavigate } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import { useHydrateAndSyncAtoms } from 'base';
import { HeroAvatar, AwardList } from '~/components';
import { rootRoute } from '../root';
import { heroAwardsAtom, heroAtom, directionAtom } from './atoms';

const heroSearchSchema = z.object({
  direction: z.enum(['received', 'given']).catch('received'),
  award: z.preprocess(String, z.string()).optional()
});

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  validateSearch: heroSearchSchema,
  component: function Hero({ useParams, useSearch }) {
    const { hero } = useParams();
    const { direction, award } = useSearch();

    const navigate = useNavigate();
    const awards = useAtomValue(heroAwardsAtom);
    
    useHydrateAndSyncAtoms([
      [heroAtom, hero],
      [directionAtom, direction]
    ]);

    const handleActiveAwardOutsideRange = useCallback(() => {
      navigate({ to: '/$hero', params: { hero }, search: { direction } });
    }, []);

    return (
      <>
        <AppBar position="relative" color="inherit">
          <Toolbar component={Stack} gap={2} direction="row">
            <HeroAvatar sx={{ marginLeft: -0.75 }} hero={hero} />
            <Typography sx={{ flex: 1 }} variant="h6" noWrap>
              {hero}
            </Typography>
            <IconButton edge="end" component={Link as any} to="/">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Tabs value={direction} variant="fullWidth">
            <Tab
              component={Link as any}
              label={<Trans>Received</Trans>}
              value="received"
              from="/$hero"
              params={{ hero }}
              search={{ direction: 'received' }}
            />
            <Tab
              component={Link as any}
              label={<Trans>Given</Trans>}
              value="given"
              from="/$hero"
              params={{ hero }}
              search={{ direction: 'given' }}
            />
          </Tabs>
        </AppBar>
        <AwardList
          awards={awards}
          activeAwardId={award}
          onActiveAwardOutsideRange={handleActiveAwardOutsideRange}
        />
      </>
    );
  }
});

