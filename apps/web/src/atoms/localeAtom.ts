import { atomWithStorage } from 'jotai/utils';

export const localeAtom = atomWithStorage('locale', 'en', undefined, {
  getOnInit: true
});
