import cors, { FastifyCorsOptions } from '@fastify/cors';

export const autoConfig: FastifyCorsOptions = {
  origin: process.env.HEROPAD_CORS_ORIGIN?.split(',') ?? '*',
  methods: ['GET']
};

export default cors;
