import { Tab } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const TabLink: RouterLinkComponent<typeof Tab> = props => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Tab {...props} component={Link as any} />
);
