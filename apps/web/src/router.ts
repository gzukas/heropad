import { Router, RouterContext } from '@tanstack/react-router';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { rootRoute } from './routes/root';
import { getAppStore } from './context/getAppStore';

const routeTree = rootRoute.addChildren([indexRoute, heroRoute]);

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
