import { Kysely, sql } from 'kysely';
import { Type } from '@sinclair/typebox';
import { wrap } from '@typeschema/typebox';
import { createTRPCRouter, dbProcedure } from '../../utils/trpc.js';
import { pqids } from '../../utils/pqids.js';
import { Database } from '../../database/db.js';
import { parseOrderBy } from '../../utils/parseOrderBy.js';

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

const GetAwardsSchema = Type.Object({
  hero: Type.String(),
  direction: Type.Optional(
    Type.Union([Type.Literal('received'), Type.Literal('given')])
  ),
  limit: Type.Optional(
    Type.Number({
      minimum: 1,
      maximum: 100
    })
  ),
  givenSince: Type.Optional(Type.Date()),
  sort: Type.Optional(
    Type.Union([Type.Literal('givenAt'), Type.Literal('-givenAt')])
  )
});

export const awardRouter = createTRPCRouter({
  getAward: dbProcedure
    .input(wrap(Type.Object({ id: Type.String() })))
    .query(({ ctx, input }) =>
      selectAwards(ctx.db)
        .where('award.id', '=', eb => pqids(eb).decode(input.id))
        .executeTakeFirstOrThrow()
    ),
  getAwards: dbProcedure
    .input(wrap(GetAwardsSchema))
    .query(async ({ ctx, input }) => {
      const {
        hero,
        direction = 'received',
        limit = 10,
        givenSince,
        sort = '-givenAt'
      } = input;
      const [orderBy, orderByDirection] = parseOrderBy(sort);
      const rows = await selectAwards(ctx.db)
        .$if(direction === 'received', qb => qb.where('to.username', '=', hero))
        .$if(direction === 'given', qb => qb.where('from.username', '=', hero))
        .$if(Boolean(givenSince), qb =>
          qb.where(
            eb =>
              eb.fn('date_trunc', [sql.lit('millisecond'), eb.ref('givenAt')]),
            orderByDirection === 'desc' ? '<=' : '>=',
            givenSince!
          )
        )
        .orderBy(orderBy, orderByDirection)
        .limit(limit + 1)
        .execute();

      const [{ givenAt: nextGivenAt = undefined } = {}] = rows.splice(limit);
      return { rows, nextGivenAt };
    })
});
