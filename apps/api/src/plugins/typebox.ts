import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';

const typebox: FastifyPluginAsync = async fastify => {
  fastify.setValidatorCompiler(TypeBoxValidatorCompiler);
};

export default fp(typebox);
