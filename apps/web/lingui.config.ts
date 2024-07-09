import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'lt'],
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src']
    }
  ],
  format: 'po',
  formatOptions: {
    lineNumbers: false
  }
};

export default config;
