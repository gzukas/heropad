import { i18n, Messages } from '@lingui/core';
import { atomEffect } from 'jotai-effect';
import { atom } from 'jotai';
import { localeAtom } from './localeAtom';
import { messages as enMessages } from '~/locales/en';

type Catalog = { messages: Messages };

i18n.loadAndActivate({ locale: 'en', messages: enMessages });

const messagesCacheAtom = atom(
  new Map<string, Messages>([[i18n.locale, i18n.messages]])
);

/**
 * Atom effect to manage locale changes and message loading.
 *
 * This effect watches for changes to the `localeAtom` and ensures that
 * the appropriate locale messages are loaded and activated. It also caches
 * loaded messages to avoid redundant requests.
 */
export const localeEffect = atomEffect((get, set) => {
  const locale = get(localeAtom);
  const messagesCache = get.peek(messagesCacheAtom);
  const abortController = new AbortController();

  if (locale === i18n.locale) {
    return;
  }

  (async () => {
    let messages = messagesCache.get(locale);
    if (!messages) {
      const catalog = (await import(`../locales/${locale}.po`)) as Catalog;
      messages = catalog.messages;
      set(messagesCacheAtom, new Map([...messagesCache, [locale, messages]]));
    }
    if (!abortController.signal.aborted) {
      i18n.loadAndActivate({ locale, messages });
    }
  })();

  return () => abortController.abort();
});
