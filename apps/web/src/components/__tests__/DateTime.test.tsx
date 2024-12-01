import { render, screen } from '@testing-library/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { DateTime } from '../DateTime';

describe('DateTime', () => {
  beforeAll(() => {
    i18n.load({
      en: {}
    });
    i18n.activate('en');
  });

  it('renders a formatted date with custom options', () => {
    const date = new Date(Date.UTC(2024, 0, 1));
    render(
      <I18nProvider i18n={i18n}>
        <DateTime year="numeric" month="long">
          {date}
        </DateTime>
      </I18nProvider>
    );
    expect(screen.getByText(/January 2024/)).toBeInTheDocument();
  });

  it('throws for invalid date', () => {
    expect(() =>
      render(
        <I18nProvider i18n={i18n}>
          <DateTime>not-a-date</DateTime>
        </I18nProvider>
      )
    ).toThrow(RangeError);
  });
});
