import { z } from 'zod';
import { createTRPCRouter, dbProcedure } from '../../utils/trpc.js';

export const heroRouter = createTRPCRouter({
  getHero: dbProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom('hero')
        .selectAll()
        .where('hero.username', '=', input.username)
        .executeTakeFirstOrThrow()
    )
});
