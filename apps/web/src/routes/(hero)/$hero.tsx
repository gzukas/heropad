import { Atom } from 'jotai';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { heroFamily } from '~/atoms/heroFamily';
import { atomsWithPagination } from '~/utils/atomsWithPagination';
import { api } from '~/utils/api';
import { GetAwardsInput } from '~/types';

type AwardSearch = Pick<GetAwardsInput, 'direction' | 'sort'>;

const defaultAwardSearch: AwardSearch = {
  direction: 'received',
  sort: '-givenAt'
};

export const Route = createFileRoute('/(hero)/$hero')({
  shouldReload: false,
  staticData: {
    shiftContentBy: 486
  },
  validateSearch: ({
    direction,
    sort
  }: Record<string, unknown>): AwardSearch => ({
    direction:
      direction === 'received' || direction === 'given' ? direction : undefined,
    sort: sort === '-givenAt' || sort === 'givenAt' ? sort : undefined
  }),
  loaderDeps: ({ search }) => ({
    ...defaultAwardSearch,
    ...search
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
  component: lazyRouteComponent(
    () => import('./-components/HeroProfile'),
    'HeroProfile'
  )
});
