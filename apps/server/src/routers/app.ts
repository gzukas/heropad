import { createTRPCRouter } from '../trpc';
import { graphRouter } from './graph';
import { heroRouter } from './hero';
import { searchRouter } from './search';

export const appRouter = createTRPCRouter({
  graph: graphRouter,
  hero: heroRouter,
  search: searchRouter
});

export type AppRouter = typeof appRouter;
