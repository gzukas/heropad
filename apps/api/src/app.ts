import path from 'node:path';
import { type FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyAutoload from '@fastify/autoload';

export default async function app(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins'),
    options: { ...options }
  });

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'routes'),
    ignoreFilter: /trpc/,
    options: { ...options }
  });
}
