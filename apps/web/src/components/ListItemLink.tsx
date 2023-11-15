import { ListItemButton } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const ListItemLink: RouterLinkComponent<
  typeof ListItemButton
> = props => <ListItemButton {...props} component={Link as any} />;
