import { Type } from '@sinclair/typebox';
import { wrap } from '@typeschema/typebox';
import { createTRPCRouter, dbProcedure } from '../../utils/trpc.js';

export const heroRouter = createTRPCRouter({
  getHero: dbProcedure
    .input(wrap(Type.Object({ username: Type.String() })))
    .query(({ ctx, input }) =>
      ctx.db
        .selectFrom('hero')
        .selectAll()
        .where('hero.username', '=', input.username)
        .executeTakeFirstOrThrow()
    )
});
