import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { useAccumulatedContentShift } from '../useAccumulatedContentShift';

describe('useAccumulatedContentShift', () => {
  it('should return accumulated content shift from route matches', async () => {
    const rootRoute = createRootRoute({
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
