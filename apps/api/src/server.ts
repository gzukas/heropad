import fastify from 'fastify';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from './trpc/appRouter.js';
import { createContext } from './trpc/trpc.js';
import { avatarRoutes } from './routes/avatar.js';

const server = fastify({
  logger: true,
  maxParamLength: 5000
});

await server.register(cors, {
  origin: process.env.HEROPAD_CORS_ORIGIN?.split(',') ?? '*'
});
await server.register(compress);
await server.register(avatarRoutes);
await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext }
});

try {
  await server.listen({
    host: process.env.HEROPAD_HOST || '0.0.0.0',
    port: Number(process.env.HEROPAD_PORT || 3001)
  });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}

console.log('Hello, World!');
