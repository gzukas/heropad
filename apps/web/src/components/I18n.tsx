import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { setupI18n, AllMessages } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { localeAtom } from '~/atoms/localeAtom';
import { messages as enMessages } from '../locales/en/en';
import { messages as ltMessages } from '../locales/lt/lt';

export function I18n({ children }: React.PropsWithChildren) {
  const locale = useAtomValue(localeAtom);

  const [i18n] = useState(() =>
    setupI18n({
      messages: {
        en: enMessages,
        lt: ltMessages
      } as AllMessages,
      locale
    })
  );

  useEffect(() => {
    i18n.activate(locale);
  }, [i18n, locale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
