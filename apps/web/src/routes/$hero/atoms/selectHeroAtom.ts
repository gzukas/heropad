import { api } from '~/utils/api';

export function selectHeroAtom(hero: string) {
  const atom = api.hero.getHero.atomWithQuery(() => ({ hero }));
  return atom;
}
