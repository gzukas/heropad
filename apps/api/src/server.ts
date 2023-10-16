import fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter, createContext } from './trpc/index.js';
import { avatarRoutes } from './routes/avatar.js';

const server = fastify({
  logger: true,
  maxParamLength: 5000
});

await server.register(cors);
await server.register(avatarRoutes);
await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext }
});

try {
  await server.listen({
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT || 3001)
  });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}