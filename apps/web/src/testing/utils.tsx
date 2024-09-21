import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '~/components/AppProvider';

export function renderApp(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AppProvider, ...options });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { userEvent };
