import { createRouter } from '@tanstack/react-router';
import { getDefaultStore } from 'jotai';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { awardRoute } from './routes/$hero/$awardId';

export interface AppRouterContext {
  store: ReturnType<typeof getDefaultStore>;
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  heroRoute.addChildren([awardRoute])
]);

export const router = createRouter({
  routeTree,
  context: {
    store: getDefaultStore()
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    shiftContentBy?: number;
  }
}
