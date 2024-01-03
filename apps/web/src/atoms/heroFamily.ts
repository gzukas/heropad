import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export interface HeroFamilyParams {
  username: string;
  signal?: AbortSignal;
}

export const heroFamily = atomFamily(
  ({ username, signal }: HeroFamilyParams) =>
    api.hero.getHero.atomWithQuery(() => ({ username }), { signal }),
  (a, b) => a.username === b.username
);
