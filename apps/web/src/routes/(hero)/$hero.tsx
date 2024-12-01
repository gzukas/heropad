import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { heroFamily } from '~/atoms/heroFamily';
import { atomsWithPagination } from '~/utils/atomsWithPagination';
import { Atom } from 'jotai';
import { api } from '~/utils/api';

interface HeroSearch {
  direction?: 'received' | 'given';
  sort?: '-givenAt' | 'givenAt';
}

export const Route = createFileRoute('/(hero)/$hero')({
  shouldReload: false,
  staticData: {
    shiftContentBy: 486
  },
  loaderDeps: ({ search: { direction = 'received', sort = '-givenAt' } }) => ({
    direction,
    sort
  }),
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
  validateSearch: ({
    direction,
    sort
  }: Record<string, unknown>): HeroSearch => ({
    direction:
      direction === 'received' || direction === 'given' ? direction : undefined,
    sort: sort === '-givenAt' || sort === 'givenAt' ? sort : undefined
  }),
  component: lazyRouteComponent(
    () => import('./-components/HeroProfile'),
    'HeroProfile'
  )
});
