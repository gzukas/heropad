import { RouterProvider } from '@tanstack/react-router';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { router } from '~/router';
import { AppStoreProvider } from '~/context';
import { I18n } from './I18n';

const theme = extendTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  }
});

export function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AppStoreProvider>
        <I18n>
          <RouterProvider router={router} />
        </I18n>
      </AppStoreProvider>
    </CssVarsProvider>
  );
}
