import { z } from 'zod';
import { sql } from 'kysely';
import { createTRPCRouter, publicProcedure } from '../trpc.js';

export const heroRouter = createTRPCRouter({
  getHero: publicProcedure
    .input(z.object({ hero: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom('hero')
        .selectAll()
        .where('hero.username', '=', input.hero)
        .executeTakeFirstOrThrow()
    ),
  getAwards: publicProcedure
    .input(
      z.object({
        hero: z.string(),
        direction: z.enum(['received', 'given']).default('received'),
        limit: z.number().min(1).max(100).default(10),
        givenSince: z.date().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { hero, direction, limit, givenSince } = input;
      const rows = await ctx.db
        .selectFrom('award')
        .innerJoin('hero as from', 'award.fromId', 'from.id')
        .innerJoin('hero as to', 'award.toId', 'to.id')
        .select([
          'award.id',
          'award.givenAt',
          'award.description',
          'from.username as from',
          'to.username as to'
        ])
        .$if(direction === 'received', qb => qb.where('to.username', '=', hero))
        .$if(direction === 'given', qb => qb.where('from.username', '=', hero))
        .$if(Boolean(givenSince), qb =>
          qb.where(
            eb =>
              eb.fn('date_trunc', [
                sql.lit('millisecond'),
                eb.ref('award.givenAt')
              ]),
            '<=',
            givenSince!
          )
        )
        .orderBy('award.givenAt', 'desc')
        .limit(limit + 1)
        .execute();

      const [{ givenAt: nextGivenAt = undefined } = {}] = rows.splice(limit);
      return { rows, nextGivenAt };
    })
});
