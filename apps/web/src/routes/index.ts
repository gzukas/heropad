import { Route } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/'
});
