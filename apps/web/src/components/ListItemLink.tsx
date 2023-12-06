import { ListItemButton } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const ListItemLink: RouterLinkComponent<
  typeof ListItemButton
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = props => <ListItemButton {...props} component={Link as any} />;
