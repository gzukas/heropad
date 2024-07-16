import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router';
import { useMatchesChildRoute } from '../useMatchesChildRoute';
import { act, render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';

describe('useMatchesChildRoute', () => {
  it('should return `true` when when parent route renders a child route', async () => {
    const matches = vi.fn();
    const rootRoute = createRootRoute({
      component: function Root() {
        const matchesChildRoute = useMatchesChildRoute();
        useEffect(() => {
          matches(matchesChildRoute);
        });
        return <Outlet />;
      }
    });
    const childRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/child'
    });
    const router = createRouter({
      routeTree: rootRoute.addChildren([childRoute]),
      history: createMemoryHistory()
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<RouterProvider router={router as any} />);

    await waitFor(() => {
      expect(matches).toHaveBeenLastCalledWith(false);
    });

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.navigate({ to: '/child' } as any);
    });

    await waitFor(() => {
      expect(matches).toHaveBeenLastCalledWith(true);
    });
  });
});
