import { RouterProvider } from '@tanstack/react-router';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { router } from '~/router';
import { AppStoreProvider } from '~/context';
import { I18n } from './I18n';

export function App() {
  return (
    <CssVarsProvider>
      <CssBaseline enableColorScheme />
      <AppStoreProvider>
        <I18n>
          <RouterProvider router={router} />
        </I18n>
      </AppStoreProvider>
    </CssVarsProvider>
  );
}
