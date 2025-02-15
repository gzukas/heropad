import { Type } from '@sinclair/typebox';
import { wrap } from '@typeschema/typebox';
import { sql } from 'kysely';
import { createTRPCRouter, dbProcedure } from '../../utils/trpc.js';
import { pqids } from '../../utils/pqids.js';

export const searchRouter = createTRPCRouter({
  getSuggestions: dbProcedure
    .input(wrap(Type.Object({ query: Type.String() })))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom('hero_award_search')
        .select(eb => [
          pqids(eb).encode<string>('id').as('id'),
          'kind',
          'nodes',
          'text'
        ])
        .where('search', '@@', ({ fn, val }) =>
          fn('websearch_to_tsquery', [sql.lit('english'), val(input.query)])
        )
        .limit(10)
        .execute()
    )
});
