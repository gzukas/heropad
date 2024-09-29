import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import {
  validatorCompiler,
  serializerCompiler
} from 'fastify-type-provider-zod';

const zodTypeProvider: FastifyPluginAsync = async fastify => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
};

export default fp(zodTypeProvider);
