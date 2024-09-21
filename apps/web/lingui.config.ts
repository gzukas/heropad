import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  rootDir: 'src',
  locales: ['en', 'lt'],
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}',
      include: ['<rootDir>']
    }
  ],
  compileNamespace: 'es',
  format: 'po',
  formatOptions: {
    lineNumbers: false
  }
};

export default config;
