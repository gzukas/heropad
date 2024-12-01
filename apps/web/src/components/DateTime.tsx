import { useLingui } from '@lingui/react';

export interface DateTimeProps extends Intl.DateTimeFormatOptions {
  children: Date | string;
}

export function DateTime(props: DateTimeProps) {
  const { children, ...options } = props;
  const { i18n } = useLingui();
  return i18n.date(children, options);
}
