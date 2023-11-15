import { Suspense } from 'react';
import { ListItem, Tooltip } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Route, useParams } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { useAtomValue } from 'jotai';
import { awardFamily } from '~/atoms/awardFamily';
import { ListItemAward, IconButtonLink } from '~/components';
import { heroRoute } from '../index';

export const awardRoute = new Route({
  getParentRoute: () => heroRoute,
  path: '$awardId',
  wrapInSuspense: false,
  component: function Award() {
    return (
      <ListItem>
        <Suspense fallback={<ListItemAward loading />}>
          <AwardInner />
        </Suspense>
        <Tooltip title={<Trans>Unpin award</Trans>}>
          <IconButtonLink
            to="/$hero"
            params={prev => prev}
            search={prev => prev}
            edge="end"
            sx={{ ml: 0.5 }}
          >
            <PushPinIcon />
          </IconButtonLink>
        </Tooltip>
      </ListItem>
    );
  }
});

function AwardInner() {
  const { awardId } = useParams({ from: '/$hero/$awardId' });
  const award = useAtomValue(awardFamily(awardId));
  return <ListItemAward award={award} />;
}
