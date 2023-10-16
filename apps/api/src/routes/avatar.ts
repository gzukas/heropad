import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { FastifyPluginAsync } from 'fastify';

interface AvatarRequest {
  Params: {
    hero: string;
  };
}

export const avatarRoutes: FastifyPluginAsync = async server => {
  server.get<AvatarRequest>('/avatars/:hero.svg', (request, reply) => {
    const { hero } = request.params;

    reply.header('Content-Type', 'image/svg+xml');
    reply.header('Content-Disposition', `inline; filename="${hero}.svg"`);
    reply.header('Cache-Control', `max-age=${365 * 24 * 60 * 60}`);
    reply.header('X-Robots-Tag', 'noindex');

    return createAvatar(avataaars, { seed: hero, size: 48 }).toString();
  });
};
