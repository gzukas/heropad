/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import superjson from 'superjson';
import { type AppRouter } from '../../../server/src/routers/app';

export const api = createTRPCJotai<AppRouter>({
  transformer: superjson,
  links: [
    // loggerLink({
    //   enabled: opts =>
    //     process.env.NODE_ENV === 'development' ||
    //     (opts.direction === 'down' && opts.result instanceof Error)
    // }),
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL
    })
  ]
});
