import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const avatarRoute: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:hero.svg',
    {
      schema: {
        params: z.object({
          hero: z
            .string()
            .min(1, 'Hero name cannot be empty')
            .max(64, 'Hero name is too long')
            .regex(/^[a-zA-Z0-9_.-]+$/, 'Hero name contains invalid characters')
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

export default avatarRoute;
