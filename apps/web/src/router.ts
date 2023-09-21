import { Router } from '@tanstack/react-router';
import { indexRoute } from './routes';
import { heroRoute } from './routes/$hero';
import { rootRoute } from './routes/root';

const routeTree = rootRoute.addChildren([indexRoute, heroRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
