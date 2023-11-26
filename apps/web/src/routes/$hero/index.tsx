import { Route, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../__root';

interface HeroSearch {
  direction?: 'received' | 'given';
}

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  validateSearch: ({ direction }: Record<string, unknown>): HeroSearch => {
    return {
      direction:
        direction === 'received' || direction === 'given'
          ? direction
          : 'received'
    };
  },
  component: lazyRouteComponent(() => import('./components/Hero'), 'Hero')
});
