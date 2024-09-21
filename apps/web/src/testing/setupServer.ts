import { setupServer as setupServerMsw, SetupServer } from 'msw/node';
import { RequestHandler } from 'msw';
import { createTRPCMsw } from 'msw-trpc';
import superjson from 'superjson';
import type { AppRouter } from '../../../api/src/trpc/appRouter';

const _trpcMsw = createTRPCMsw<AppRouter>({
  transformer: { input: superjson, output: superjson }
});

export function setupServer(
  getRequestHandlers: (trpcMsw: typeof _trpcMsw) => Array<RequestHandler>
): SetupServer {
  const server = setupServerMsw(...getRequestHandlers(_trpcMsw));
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  return server;
}
