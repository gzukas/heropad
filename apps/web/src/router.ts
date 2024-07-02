import { createRouter } from '@tanstack/react-router';
import { getDefaultStore } from 'jotai';
import { routeTree } from './routeTree.gen';

export interface AppRouterContext {
  store: ReturnType<typeof getDefaultStore>;
}

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
