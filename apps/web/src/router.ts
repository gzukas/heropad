import { Router } from '@tanstack/react-router';
import { getDefaultStore } from 'jotai';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { awardRoute } from './routes/$hero/$awardId';

export interface AppRouterContext {
  store: ReturnType<typeof getDefaultStore>;
  shiftContentBy?: number;
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  heroRoute.addChildren([awardRoute])
]);

export const router = new Router({
  routeTree,
  context: {
    store: getDefaultStore()
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
