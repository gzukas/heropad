import { DISABLED } from 'jotai-trpc';
import { api } from '~/utils/api';
import { heroAtom } from './heroAtom';
import { directionAtom } from './directionAtom';

export const heroAwardsAtom = api.hero.getAwards.atomWithQuery(
  get => {
    const hero = get(heroAtom);
    return hero
      ? {
          hero,
          direction: get(directionAtom)
        }
      : DISABLED;
  },
  {
    disabledOutput: []
  }
);
