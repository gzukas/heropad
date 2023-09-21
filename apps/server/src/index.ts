import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './routers/app';
import { createTRPCContext } from './trpc';

const { listen } = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext: createTRPCContext
});

listen(3001);
