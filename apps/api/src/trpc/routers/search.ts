import { z } from 'zod';
import { sql } from 'kysely';
import { createTRPCRouter, publicProcedure } from '../trpc.js';

type SeachSuggestionKind = 'hero' | 'award';

export const searchRouter = createTRPCRouter({
  getSuggestions: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom(eb =>
          eb
            .selectFrom('hero')
            .select([
              'hero.id as id',
              'name as text',
              sql<Array<[string, string]>>`ARRAY[[${sql.id(
                'username'
              )}, ${sql.id('name')}]]`.as('nodes'),
              sql.lit<SeachSuggestionKind>('hero').as('kind')
            ])
            .union(eb =>
              eb
                .selectFrom('award')
                .innerJoin('hero as from', 'award.fromId', 'from.id')
                .innerJoin('hero as to', 'award.toId', 'to.id')
                .select([
                  'award.id as id',
                  'description as text',
                  sql<Array<[string, string]>>`ARRAY[[${sql.id(
                    'from',
                    'username'
                  )}, ${sql.id('from', 'name')}], [${sql.id(
                    'to',
                    'username'
                  )}, ${sql.id('to', 'name')}]]`.as('nodes'),
                  sql.lit<SeachSuggestionKind>('award').as('kind')
                ])
            )
            .as('xxx')
        )
        .selectAll()
        .where('text', 'ilike', `%${input.query}%`)
        .limit(10)
        .execute()
    )
});
