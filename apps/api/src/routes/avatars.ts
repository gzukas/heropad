import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import {
  Type,
  FastifyPluginAsyncTypebox
} from '@fastify/type-provider-typebox';

const avatarsRoute: FastifyPluginAsyncTypebox = async fastify => {
  fastify.get(
    '/avatars/:hero.svg',
    {
      schema: {
        params: Type.Object({
          hero: Type.String({
            minLength: 1,
            maxLength: 64,
            pattern: '^[a-zA-Z0-9_.-]+$'
          })
        })
      }
    },
    (request, reply) => {
      const { hero } = request.params;
      reply
        .type('image/svg+xml')
        .header('Content-Disposition', `inline; filename="${hero}.svg"`)
        .header('Cache-Control', `max-age=${365 * 24 * 60 * 60}`)
        .header('X-Robots-Tag', 'noindex');

      return createAvatar(avataaars, { seed: hero, size: 48 }).toString();
    }
  );
};

export default avatarsRoute;
