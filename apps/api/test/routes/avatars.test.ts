import { FastifyInstance } from 'fastify';
import { describe, expect } from 'vitest';
import { testApp } from '../testApp';

describe('/avatars/:hero.svg', () => {
  const injectAvatarGet = (app: FastifyInstance, hero: string) => {
    return app.inject({
      method: 'GET',
      url: `/avatars/${hero}.svg`
    });
  };

  testApp('should respond with an avatar image', async ({ app }) => {
    const response = await injectAvatarGet(app, 'test');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('image/svg+xml');
    expect(response.body).toMatch(/^<svg /);
  });

  testApp(
    'should validate that the hero parameter has a minimum length of 1',
    async ({ app }) => {
      const response = await injectAvatarGet(app, '');
      expect(response.statusCode).toBe(400);
    }
  );

  testApp(
    'should validate that the hero parameter has a maximum length of 64',
    async ({ app }) => {
      const response = await injectAvatarGet(app, 'a'.repeat(65));
      expect(response.statusCode).toBe(400);
    }
  );

  testApp(
    'should validate that the hero parameter only contains allowed characters',
    async ({ app }) => {
      const response = await injectAvatarGet(app, '/@$%');
      expect(response.statusCode).toBe(400);
    }
  );
});
