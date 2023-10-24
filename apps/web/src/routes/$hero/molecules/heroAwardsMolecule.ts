import { molecule } from 'bunshi';
import { Atom, atom } from 'jotai';
import { unwrap } from 'jotai/utils';
import { DISABLED } from 'jotai-trpc';
import { atomsWithPagination } from '~/utils';
import { api } from '~/utils/api';
import { DirectionScope } from '../scopes/directionScope';
import { HeroScope } from '../scopes/heroScope';

export const heroAwardMolecule = molecule((_mol, scope) => {
  const hero = scope(HeroScope);
  const direction = scope(DirectionScope);
  const [heroAwardPagesAtom, fetchNextHeroAwardsAtom] = atomsWithPagination({
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

  const heroAwardsAtom = unwrap(
    atom(get =>
      get(heroAwardPagesAtom)
        .flatMap(page => page?.rows)
        .filter(Boolean)
    ),
    prev => prev || []
  );

  return {
    heroAwardsAtom,
    fetchNextHeroAwardsAtom
  };
});
