import { IconButton, ListItem, Tooltip } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Link, createFileRoute, getRouteApi } from '@tanstack/react-router';
import { Trans } from '@lingui/macro';
import { awardFamily } from '~/atoms/awardFamily';
import { ListItemAward } from '~/components/ListItemAward';

const routeApi = getRouteApi('/$hero/$awardId');

export const Route = createFileRoute('/(hero)/$hero/$awardId')({
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
  component: Award
});

function Award() {
  const { hero } = routeApi.useParams();
  const award = routeApi.useLoaderData();
  return (
    <ListItem>
      <ListItemAward award={award} />
      <Tooltip title={<Trans>Unpin award</Trans>}>
        <IconButton
          component={Link}
          to="/$hero"
          params={{ hero }}
          search={prev => prev}
          edge="end"
          sx={{ ml: 0.5 }}
        >
          <PushPinIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
