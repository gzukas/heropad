import fastify, { FastifyServerOptions } from 'fastify';
import fp from 'fastify-plugin';
import closeWithGrace from 'close-with-grace';
import app from './app.js';

function getLogger(): FastifyServerOptions['logger'] {
  if (process.stdout.isTTY) {
    return {
      level: process.env.HEROPAD_LOG_LEVEL ?? 'info',
      transport: {
        target: 'pino-pretty'
      }
    };
  }
  return {
    level: process.env.HEROPAD_LOG_LEVEL ?? 'silent'
  };
}

const server = fastify({
  logger: getLogger(),
  maxParamLength: 5000
});

async function start() {
  server.register(fp(app));

  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      server.log.error(err);
    }
    await server.close();
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
