import { Router } from '@tanstack/react-router';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { rootRoute } from './routes/root';
import { awardRoute } from './routes/$hero/$awardId';
import { getDefaultStore } from 'jotai';

export interface AppRouterContext {
  store: ReturnType<typeof getDefaultStore>;
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  heroRoute.addChildren([awardRoute])
]);

export const router = new Router({
  routeTree,
  context: { store: getDefaultStore() }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
