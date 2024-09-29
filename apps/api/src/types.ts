import { inferRouterOutputs } from '@trpc/server';
import { type TrpcRouter } from './plugins/trpc.js';
import { type Database } from './database/db.js';
import { type Kysely } from 'kysely';

type RouterOutput = inferRouterOutputs<TrpcRouter>;

export interface TrpcContext {
  db: Kysely<Database>;
}

export { TrpcRouter };
export type Hero = RouterOutput['hero']['getHero'];
export type Award = RouterOutput['award']['getAward'];
export type AwardsOutput = RouterOutput['award']['getAwards'];
