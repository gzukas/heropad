import { createTRPCRouter, publicProcedure } from '../trpc.js';

export const graphRouter = createTRPCRouter({
  getEdges: publicProcedure.query(({ ctx }) =>
    ctx.db
      .selectFrom('award')
      .innerJoin('hero as from', 'award.fromId', 'from.id')
      .innerJoin('hero as to', 'award.toId', 'to.id')
      .select(['award.id', 'from.username as from', 'to.username as to'])
      .execute()
  )
});
