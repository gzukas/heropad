import { createTRPCRouter } from './trpc.js';
import { graphRouter } from './routers/graph.js';
import { heroRouter } from './routers/hero.js';
import { searchRouter } from './routers/search.js';
import { awardRouter } from './routers/award.js';

export const appRouter = createTRPCRouter({
  award: awardRouter,
  graph: graphRouter,
  hero: heroRouter,
  search: searchRouter
});

export type AppRouter = typeof appRouter;
