import { useAtom } from 'jotai';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { localeEffect } from '~/atoms/localeEffect';
import { Suspense } from 'react';

const theme = createTheme({
  colorSchemes: { dark: true },
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 600
      }
    }
  }
});

export function AppProvider({ children }: React.PropsWithChildren<unknown>) {
  useAtom(localeEffect);

  return (
    <Suspense>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
      </ThemeProvider>
    </Suspense>
  );
}
