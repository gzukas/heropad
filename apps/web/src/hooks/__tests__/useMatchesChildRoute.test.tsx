import {
  RootRoute,
  Route,
  Outlet,
  Router,
  RouterProvider,
  createMemoryHistory
} from '@tanstack/react-router';
import { useMatchesChildRoute } from '../useMatchesChildRoute';
import { act, render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';

describe('useMatchesChildRoute', () => {
  it('should return `true` when when parent route renders a child route', async () => {
    const matches = vi.fn<[boolean]>();
    const rootRoute = new RootRoute({
      component: function Root() {
        const matchesChildRoute = useMatchesChildRoute();
        useEffect(() => {
          matches(matchesChildRoute);
        });
        return <Outlet />;
      }
    });
    const childRoute = new Route({
      getParentRoute: () => rootRoute,
      path: '/child'
    });
    const router = new Router({
      routeTree: rootRoute.addChildren([childRoute]),
      history: createMemoryHistory()
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(matches).toHaveBeenLastCalledWith(false);
    });

    act(() => {
      router.navigate({ to: '/child' });
    });

    await waitFor(() => {
      expect(matches).toHaveBeenLastCalledWith(true);
    });
  });
});
