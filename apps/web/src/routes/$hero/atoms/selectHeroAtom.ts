import { api } from '~/utils/api';

export function selectHeroAtom(hero: string) {
  const atom = api.hero.getHero.atomWithQuery(() => ({ hero }));
  atom.debugLabel = 'heroAtom';
  return atom;
}
