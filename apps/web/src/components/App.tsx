import { RouterProvider } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { router } from '~/router';
import { localeEffect } from '~/atoms/localeEffect';

const theme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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
    <CssVarsProvider
      theme={theme}
      disableTransitionOnChange
      disableNestedContext
    >
      <CssBaseline enableColorScheme />
      <I18nProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nProvider>
    </CssVarsProvider>
  );
}
