import { httpBatchLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import superjson from 'superjson';
import { type TrpcRouter } from '../../../api/src/types';

export const api = createTRPCJotai<TrpcRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`
    })
  ]
});
