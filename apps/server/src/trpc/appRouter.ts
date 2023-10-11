import { createTRPCRouter } from './trpc';
import { graphRouter } from './routers/graph';
import { heroRouter } from './routers/hero';
import { searchRouter } from './routers/search';

export const appRouter = createTRPCRouter({
  graph: graphRouter,
  hero: heroRouter,
  search: searchRouter
});

export type AppRouter = typeof appRouter;
