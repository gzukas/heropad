import {
  RouterProvider,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { useAccumulatedContentShift } from '../useAccumulatedContentShift';
import { AppRouterContext } from '~/router';

describe('useAccumulatedContentShift', () => {
  it('should return accumulated content shift from route matches', async () => {
    const rootRoute = createRootRouteWithContext<AppRouterContext>()({
      staticData: {
        shiftContentBy: 100
      }
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      staticData: {
        shiftContentBy: 200
      },
      path: '/',
      component: function Index() {
        const shift = useAccumulatedContentShift();
        return <>{shift}</>;
      }
    });
    const router = createRouter({
      routeTree: rootRoute.addChildren([indexRoute]),
      history: createMemoryHistory()
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<RouterProvider router={router as any} />);

    expect(await screen.findByText('300')).toBeDefined();
  });
});
