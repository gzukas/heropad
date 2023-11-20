import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export const heroFamily = atomFamily((username: string) =>
  api.hero.getHero.atomWithQuery(() => ({ username }))
);
