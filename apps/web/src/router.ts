import { Router } from '@tanstack/react-router';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { rootRoute } from './routes/root';
import { getAppStore } from './context/getAppStore';
import { awardRoute } from './routes/$hero/$awardId';

const routeTree = rootRoute.addChildren([
  indexRoute,
  heroRoute.addChildren([awardRoute])
]);

export const router = new Router({
  routeTree,
  reloadOnWindowFocus: false,
  context: { store: getAppStore() }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
