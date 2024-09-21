import { i18n, Messages } from '@lingui/core';
import { atomEffect } from 'jotai-effect';
import { localeAtom } from './localeAtom';
import { messages as enMessages } from '~/locales/en';

i18n.loadAndActivate({ locale: 'en', messages: enMessages });

const messagesCache = new Map<string, Messages>([[i18n.locale, i18n.messages]]);

async function loadMessages(locale: string) {
  if (!messagesCache.has(locale)) {
    const { messages } = await import(`../locales/${locale}.po`);
    messagesCache.set(locale, messages);
  }
  return messagesCache.get(locale)!;
}

export const localeEffect = atomEffect(get => {
  const locale = get(localeAtom);
  const abortController = new AbortController();

  if (locale === i18n.locale) {
    return;
  }

  (async () => {
    const messages = await loadMessages(locale);
    if (!abortController.signal.aborted) {
      i18n.loadAndActivate({ locale, messages });
    }
  })();

  return () => abortController.abort();
});
