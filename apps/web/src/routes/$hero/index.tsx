import { Route, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../__root';
import { heroFamily } from '~/atoms/heroFamily';
import { atomsWithPagination } from '~/utils/atomsWithPagination';
import { Atom } from 'jotai';
import { api } from '~/utils/api';

interface HeroSearch {
  direction?: 'received' | 'given';
}

export const heroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$hero',
  shouldReload: false,
  beforeLoad: () => ({
    shiftContentBy: 400
  }),
  loaderDeps: ({ search: { direction } }) => ({ direction }),
  loader: async ({
    context: { store },
    abortController: { signal },
    params,
    deps
  }) => {
    const hero = await store.get(heroFamily({ username: params.hero, signal }));
    return {
      hero,
      awardPaginationAtoms: atomsWithPagination({
        getQueryAtom: (givenSinceAtom: Atom<Date | undefined>) =>
          api.award.getAwards.atomWithQuery(
            get => ({
              givenSince: get(givenSinceAtom),
              ...params,
              ...deps
            }),
            { signal }
          ),
        getNextPageParam: lastPage => lastPage?.nextGivenAt
      })
    };
  },
  validateSearch: ({ direction }: Record<string, unknown>): HeroSearch => ({
    direction:
      direction === 'received' || direction === 'given' ? direction : 'received'
  }),
  component: lazyRouteComponent(() => import('./components/Hero'), 'Hero')
});
