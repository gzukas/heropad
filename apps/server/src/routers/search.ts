import { z } from 'zod';
import { sql } from 'database';
import { createTRPCRouter, publicProcedure } from '../trpc';

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
              sql<[string, string?]>`ARRAY["name"]`.as('nodes'),
              sql<SeachSuggestionKind>`'hero'`.as('kind')
            ])
            .union(eb =>
              eb
                .selectFrom('award')
                .innerJoin('hero as from', 'award.fromId', 'from.id')
                .innerJoin('hero as to', 'award.toId', 'to.id')
                .select([
                  'award.id as id',
                  'description as text',
                  sql<[string, string?]>`ARRAY["from"."name", "to"."name"]`.as(
                    'nodes'
                  ),
                  sql<SeachSuggestionKind>`'award'`.as('kind')
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
