import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
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

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Award = RouterOutput['award']['getAward'];
export type AwardInput = RouterInput['award']['getAward'];
export type AwardsInput = RouterInput['award']['getAwards'];

export type SearchSuggestion = RouterOutput['search']['getSuggestions'][number];
