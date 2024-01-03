import { Route, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../__root';
import { heroFamily } from '~/atoms/heroFamily';

interface HeroSearch {
  direction?: 'received' | 'given';
}

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  beforeLoad: ({ context }): typeof context => ({
    ...context,
    shiftContentBy: 400
  }),
  loader: ({ context: { store }, params, abortController }) => {
    return store.get(
      heroFamily({ username: params.hero, signal: abortController.signal })
    );
  },
  validateSearch: ({ direction }: Record<string, unknown>): HeroSearch => ({
    direction:
      direction === 'received' || direction === 'given' ? direction : 'received'
  }),
  component: lazyRouteComponent(() => import('./components/Hero'), 'Hero')
});
