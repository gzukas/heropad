import { RouterProvider } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { router } from '~/router';
import { localeEffect } from '~/atoms/localeEffect';

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

export function App() {
  useAtom(localeEffect);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <I18nProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nProvider>
    </ThemeProvider>
  );
}
