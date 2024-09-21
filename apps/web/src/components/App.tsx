import type {} from '@mui/material/themeCssVarsAugmentation';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/router';
import { AppProvider } from './AppProvider';

export function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
