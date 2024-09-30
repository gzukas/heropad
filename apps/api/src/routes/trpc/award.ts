import { z } from 'zod';
import { Kysely, sql } from 'kysely';
import { createTRPCRouter, dbProcedure } from '../../utils/trpc.js';
import { pqids } from '../../utils/pqids.js';
import { Database } from '../../database/db.js';

function selectAwards(db: Kysely<Database>) {
  return db
    .selectFrom('award')
    .innerJoin('hero as from', 'award.fromId', 'from.id')
    .innerJoin('hero as to', 'award.toId', 'to.id')
    .select(eb => [
      pqids(eb).encode<string>('award.id').as('id'),
      'award.givenAt',
      'award.description',
      'from.username as from',
      'to.username as to'
    ]);
}

export const awardRouter = createTRPCRouter({
  getAward: dbProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      selectAwards(ctx.db)
        .where('award.id', '=', eb => pqids(eb).decode(input.id))
        .executeTakeFirstOrThrow()
    ),
  getAwards: dbProcedure
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
      const rows = await selectAwards(ctx.db)
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
