import { ListItem, Tooltip } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Route, RouteApi } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { awardFamily } from '~/atoms/awardFamily';
import { ListItemAward } from '~/components/ListItemAward';
import { IconButtonLink } from '~/components/IconButtonLink';
import { heroRoute } from '../index';

const routeApi = new RouteApi({ id: '/$hero/$awardId' });

export const awardRoute = new Route({
  getParentRoute: () => heroRoute,
  path: '$awardId',
  loader: ({ context: { store }, params, abortController }) => {
    return store.get(
      awardFamily({ id: params.awardId, signal: abortController.signal })
    );
  },
  pendingComponent: () => (
    <ListItem>
      <ListItemAward loading />
    </ListItem>
  ),
  component: function Award() {
    const { hero } = routeApi.useParams();
    const award = routeApi.useLoaderData();
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
