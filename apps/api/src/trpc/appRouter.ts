import { createTRPCRouter } from './trpc.js';
import { graphRouter } from './routers/graph.js';
import { heroRouter } from './routers/hero.js';
import { searchRouter } from './routers/search.js';

export const appRouter = createTRPCRouter({
  graph: graphRouter,
  hero: heroRouter,
  search: searchRouter
});

export type AppRouter = typeof appRouter;
