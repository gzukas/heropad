import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const ListItemLink: RouterLinkComponent<ListItemButtonProps> = props => (
  <ListItemButton component={Link} {...props} />
);
