import fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter, createContext } from './trpc';

const server = fastify({
  logger: true,
  maxParamLength: 5000
});

server.register(cors);
server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext }
});

(async () => {
  try {
    await server.listen({ port: Number(process.env.PORT || 3001) });
    console.log(server.listeningOrigin);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
