import { ListItem, Tooltip } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Route } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { useAtomValue } from 'jotai';
import { awardFamily } from '~/atoms/awardFamily';
import { ListItemAward } from '~/components/ListItemAward';
import { IconButtonLink } from '~/components/IconButtonLink';
import { heroRoute } from '../index';

export const awardRoute = new Route({
  getParentRoute: () => heroRoute,
  path: '$awardId',
  load: ({ context: { store }, params }) => {
    return store.get(awardFamily(params.awardId));
  },
  pendingComponent: () => (
    <ListItem>
      <ListItemAward loading />
    </ListItem>
  ),
  component: function Award({ useParams }) {
    const { hero, awardId } = useParams();
    const award = useAtomValue(awardFamily(awardId));
    return (
      <ListItem>
        <ListItemAward award={award} />
        <Tooltip title={<Trans>Unpin award</Trans>}>
          <IconButtonLink
            to="/$hero"
            params={{ hero }}
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
