import fastify, { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { test } from 'vitest';
import serviceApp from '../src/app.js';

export const testApp = test.extend<{ app: FastifyInstance }>({
  // eslint-disable-next-line no-empty-pattern
  app: async ({}, use) => {
    const app = fastify({ logger: false }).register(fp(serviceApp));
    await use(app);
    await app.close();
  }
});
