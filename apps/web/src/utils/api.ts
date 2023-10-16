import { httpBatchLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import superjson from 'superjson';
import { type AppRouter } from '../../../api/src/trpc/appRouter';

export const api = createTRPCJotai<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`
    })
  ]
});
