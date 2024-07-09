import { i18n, Messages } from '@lingui/core';
import { atomEffect } from 'jotai-effect';
import { localeAtom } from './localeAtom';

export const localeEffect = atomEffect(get => {
  const locale = get(localeAtom);
  const abortController = new AbortController();

  import(`../locales/${locale}.po`).then(
    ({ messages }: { messages: Messages }) => {
      if (!abortController.signal.aborted) {
        i18n.loadAndActivate({ locale, messages });
      }
    }
  );

  return () => abortController.abort();
});
