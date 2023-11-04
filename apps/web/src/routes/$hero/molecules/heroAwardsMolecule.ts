import { molecule } from 'bunshi';
import { Atom, atom } from 'jotai';
import { DISABLED } from 'jotai-trpc';
import { loadable } from 'jotai/utils';
import { atomsWithPagination } from '~/utils';
import { api } from '~/utils/api';
import { HeroScope, DirectionScope, VoidScope } from '../scopes';

export const heroAwardsMolecule = molecule((_mol, scope) => {
  scope(VoidScope);
  const hero = scope(HeroScope);
  const direction = scope(DirectionScope);

  const [heroAwardPagesAtom, fetchNextHeroAwardsAtom, queryAtom] =
    atomsWithPagination({
      getQueryAtom: (givenSinceAtom: Atom<Date | undefined>) =>
        api.hero.getAwards.atomWithQuery(get =>
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

  const heroAwardsAtom = atom(get =>
    get(heroAwardPagesAtom)
      .flatMap(page => page?.rows)
      .filter(Boolean)
  );

  const heroAwardsQueryAtom = loadable(queryAtom);

  return {
    heroAwardsAtom,
    heroAwardsQueryAtom,
    fetchNextHeroAwardsAtom
  };
});
