import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { type TrpcRouter } from './plugins/trpc.js';
import { type Database } from './database/db.js';
import { type Kysely } from 'kysely';

type RouterInput = inferRouterInputs<TrpcRouter>;
type RouterOutput = inferRouterOutputs<TrpcRouter>;

export interface TrpcContext {
  db: Kysely<Database>;
}

export { TrpcRouter };
export type Hero = RouterOutput['hero']['getHero'];
export type Award = RouterOutput['award']['getAward'];
export type GetAwardsInput = RouterInput['award']['getAwards'];
export type GetAwardsOutput = RouterOutput['award']['getAwards'];
