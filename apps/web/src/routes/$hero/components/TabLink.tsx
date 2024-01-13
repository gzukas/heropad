import { Tab, TabProps } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const TabLink: RouterLinkComponent<TabProps> = props => (
  <Tab component={Link} {...props} />
);
