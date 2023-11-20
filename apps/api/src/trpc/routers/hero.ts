import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc.js';

export const heroRouter = createTRPCRouter({
  getHero: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom('hero')
        .selectAll()
        .where('hero.username', '=', input.username)
        .executeTakeFirstOrThrow()
    )
});
