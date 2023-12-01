import { molecule } from 'bunshi';
import { Atom, atom } from 'jotai';
import { DISABLED } from 'jotai-trpc';
import { loadable } from 'jotai/utils';
import { atomsWithPagination } from '~/utils/atomsWithPagination';
import { api } from '~/utils/api';
import { HeroScope, DirectionScope } from '../scopes';

export const heroAwardsMolecule = molecule((_mol, scope) => {
  const hero = scope(HeroScope);
  const direction = scope(DirectionScope);

  const { pagesAtom, fetchNextPageAtom, queryAtom } = atomsWithPagination({
    getQueryAtom: (givenSinceAtom: Atom<Date | undefined>) =>
      api.award.getAwards.atomWithQuery(get =>
        hero
          ? {
              hero,
              direction,
              givenSince: get(givenSinceAtom)
            }
          : DISABLED
      ),
    getNextPageParam: lastPage => lastPage?.nextGivenAt
  });

  const awardsAtom = atom(get =>
    get(pagesAtom)
      .flatMap(page => page?.rows)
      .filter(Boolean)
  );

  const loadableQueryAtom = loadable(queryAtom);

  return {
    awardsAtom,
    fetchNextPageAtom,
    loadableQueryAtom
  };
});
