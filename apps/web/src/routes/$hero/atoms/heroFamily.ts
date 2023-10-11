import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export const heroFamily = atomFamily((hero: string) =>
  api.hero.getHero.atomWithQuery(() => ({ hero }))
);
