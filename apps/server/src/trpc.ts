import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { db } from 'database';

const createInnerTRPCContext = () => {
  return {
    db
  };
};

export const createTRPCContext = () => {
  return createInnerTRPCContext();
};

const t = initTRPC.context<typeof createTRPCContext>().create({
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

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
