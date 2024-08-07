import { atomWithStorage } from 'jotai/utils';
import { locales } from '../locales/locales';

function getDefaultLocale() {
  const [browserLocale] = navigator.language.split('-');
  return Object.keys(locales).includes(browserLocale) ? browserLocale : 'en';
}

export const localeAtom = atomWithStorage(
  'locale',
  getDefaultLocale(),
  undefined,
  { getOnInit: true }
);
