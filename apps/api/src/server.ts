import fastify from 'fastify';
import fp from 'fastify-plugin';
import { app } from './app.js';

const server = fastify({
  logger: true,
  maxParamLength: 5000
});

async function start() {
  server.register(fp(app));

  try {
    await server.listen({
      host: process.env.HEROPAD_HOST || '0.0.0.0',
      port: Number(process.env.HEROPAD_PORT || 3001)
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
