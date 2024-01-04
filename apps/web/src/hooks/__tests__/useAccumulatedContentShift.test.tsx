import {
  Route,
  Router,
  RouterProvider,
  createMemoryHistory,
  rootRouteWithContext
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { AppRouterContext } from '~/router';
import { useAccumulatedContentShift } from '../useAccumulatedContentShift';

describe('useAccumulatedContentShift', () => {
  it('should return accumulated content shift from route matches', async () => {
    const rootRoute = rootRouteWithContext<Partial<AppRouterContext>>()({
      beforeLoad: () => ({
        shiftContentBy: 100
      })
    });
    const indexRoute = new Route({
      getParentRoute: () => rootRoute,
      beforeLoad: () => ({
        shiftContentBy: 200
      }),
      path: '/',
      component: function Index() {
        const shift = useAccumulatedContentShift();
        return <>{shift}</>;
      }
    });
    const router = new Router({
      routeTree: rootRoute.addChildren([indexRoute]),
      history: createMemoryHistory()
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText('300')).toBeDefined();
  });
});
