import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const heroRouter = createTRPCRouter({
  getAwards: publicProcedure
    .input(
      z.object({
        hero: z.string(),
        direction: z.enum(['received', 'given']).default('received')
      })
    )
    .query(({ ctx, input }) => {
      const { hero, direction } = input;
      return ctx.db
        .selectFrom('award')
        .innerJoin('hero as from', 'award.fromId', 'from.id')
        .innerJoin('hero as to', 'award.toId', 'to.id')
        .select([
          'award.id',
          'givenAt',
          'description',
          'from.name as from',
          'to.name as to'
        ])
        .$if(direction === 'received', qb => qb.where('to.name', '=', hero))
        .$if(direction === 'given', qb => qb.where('from.name', '=', hero))
        .execute();
    })
});
