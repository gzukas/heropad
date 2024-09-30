import fastify from 'fastify';
import fp from 'fastify-plugin';
import closeWithGrace from 'close-with-grace';
import { app } from './app.js';
import { db } from './database/db.js';

const server = fastify({
  logger: true,
  maxParamLength: 5000
});

async function start() {
  server.register(fp(app));

  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      server.log.error(err);
    }
    await server.close();
    await db.destroy();
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
}

start();
