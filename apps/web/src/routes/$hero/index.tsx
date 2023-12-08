import { Route, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../__root';
import { heroFamily } from '~/atoms/heroFamily';

interface HeroSearch {
  direction?: 'received' | 'given';
}

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  wrapInSuspense: true,
  loader: ({ context: { store }, params }) =>
    store.get(heroFamily(params.hero)),
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
