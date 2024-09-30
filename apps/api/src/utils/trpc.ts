import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { NoResultError } from 'kysely';
import { TrpcContext } from '../types.js';

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});

const noResultMiddleware = t.middleware(async opts => {
  const response = await opts.next(opts);
  if (!response.ok && response.error.cause instanceof NoResultError) {
    throw new TRPCError({
      code: 'NOT_FOUND'
    });
  }
  return response;
});

export const createTRPCRouter = t.router;
export const dbProcedure = t.procedure.use(noResultMiddleware);
