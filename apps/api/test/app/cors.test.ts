import { expect } from 'vitest';
import { testApp } from '../testApp.js';

testApp('should correctly handle CORS preflight requests', async ({ app }) => {
  const response = await app.inject({
    method: 'OPTIONS',
    url: '/',
    headers: {
      Origin: 'http://example.com',
      'Access-Control-Request-Method': 'POST'
    }
  });

  expect(response.statusCode).toBe(204);
  expect(response.headers['access-control-allow-methods']).toBe('GET');
});
