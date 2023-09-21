import { MultiDirectedGraph } from 'graphology';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const graphRouter = createTRPCRouter({
  getGraph: publicProcedure.query(async ({ ctx }) => {
    const awards = await ctx.db
      .selectFrom('award')
      .innerJoin('hero as from', 'award.fromId', 'from.id')
      .innerJoin('hero as to', 'award.toId', 'to.id')
      .select(['award.id', 'from.name as from', 'to.name as to'])
      .execute();

    const graph = new MultiDirectedGraph();
    for (const award of awards) {
      const { id, from, to } = award;
      graph.mergeNode(from);
      graph.mergeNode(to);
      graph.mergeEdgeWithKey(id, from, to);
    }
    return graph.export();
  })
});
