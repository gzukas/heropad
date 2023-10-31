import { Tab } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const TabLink: RouterLinkComponent<typeof Tab> = props => (
  <Tab {...props} component={Link as any} />
);
