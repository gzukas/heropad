import { molecule } from 'bunshi';
import { Atom, atom } from 'jotai';
import { DISABLED } from 'jotai-trpc';
import { atomsWithPagination } from '~/utils';
import { api } from '~/utils/api';
import { unwrap } from 'jotai/utils';
import { DirectionScope } from '../scopes/directionScope';
import { HeroScope } from '../scopes/heroScope';

export const heroAwardMolecule = molecule((_mol, scope) => {
  const hero = scope(HeroScope);
  const direction = scope(DirectionScope);
  const [heroAwardPagesAtom, fetchNextHeroAwardsAtom] = atomsWithPagination(
    (givenSinceAtom: Atom<Date | undefined>) => {
      const xxx = api.hero.getAwards.atomWithQuery(get =>
        hero
          ? {
              hero,
              direction,
              givenSince: get(givenSinceAtom)
            }
          : DISABLED
      );
      xxx.debugLabel = 'getAwards';
      return xxx;
    },
    lastPage => lastPage?.nextGivenAt
  );

  const heroAwardsAtom = unwrap(
    atom(get => get(heroAwardPagesAtom).flatMap(page => page.rows)),
    prev => prev || []
  );

  heroAwardPagesAtom.debugLabel = 'heroAwardPagesAtom';
  fetchNextHeroAwardsAtom.debugLabel = 'fetchNextHeroAwardsAtom';
  heroAwardsAtom.debugLabel = 'heroAwardsAtom';

  return {
    heroAwardsAtom,
    fetchNextHeroAwardsAtom
  };
});
