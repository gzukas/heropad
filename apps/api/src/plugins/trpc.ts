import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify';
import { db } from '../database/db.js';
import { createTRPCRouter } from '../utils/trpc.js';
import { awardRouter } from '../routes/trpc/award.js';
import { graphRouter } from '../routes/trpc/graph.js';
import { heroRouter } from '../routes/trpc/hero.js';
import { searchRouter } from '../routes/trpc/search.js';
import { TrpcContext } from '../types.js';

function createContext(): TrpcContext {
  return {
    db
  };
}

const router = createTRPCRouter({
  award: awardRouter,
  graph: graphRouter,
  hero: heroRouter,
  search: searchRouter
});

export type TrpcRouter = typeof router;

export const autoConfig: FastifyTRPCPluginOptions<TrpcRouter> = {
  prefix: '/trpc',
  trpcOptions: { router, createContext }
};

export default fastifyTRPCPlugin;
