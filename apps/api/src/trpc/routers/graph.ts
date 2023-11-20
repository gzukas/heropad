import { createTRPCRouter, publicProcedure } from '../trpc.js';
import { db } from '../../database/db.js';

const compiledNodesQuery = db
  .selectFrom('hero')
  .select(['username', 'name'])
  .compile();

const compiledEdgesQuery = db
  .selectFrom('award')
  .innerJoin('hero as from', 'award.fromId', 'from.id')
  .innerJoin('hero as to', 'award.toId', 'to.id')
  .select(['from.username as from', 'to.username as to'])
  .compile();

export const graphRouter = createTRPCRouter({
  getGraph: publicProcedure.query(async ({ ctx }) => {
    const { rows: nodes } = await ctx.db.executeQuery(compiledNodesQuery);
    const { rows: edges } = await ctx.db.executeQuery(compiledEdgesQuery);
    return { nodes, edges };
  })
});
