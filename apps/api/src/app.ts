import path from 'node:path';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyAutoload from '@fastify/autoload';

export async function app(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins'),
    options: { ...options }
  });

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'routes'),
    routeParams: true,
    ignoreFilter: /trpc/,
    options: { ...options }
  });
}
