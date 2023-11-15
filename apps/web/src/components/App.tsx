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
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 600
      }
    }
  }
});

export function App() {
  return (
    <AppStoreProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <I18n>
          <RouterProvider router={router} />
        </I18n>
      </CssVarsProvider>
    </AppStoreProvider>
  );
}
