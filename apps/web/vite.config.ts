/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { lingui } from '@lingui/vite-plugin';

function createManualChunks(chunks: Record<string, RegExp>) {
  const chunkEntries = Object.entries(chunks);
  return (id: string) => chunkEntries.find(([, re]) => re.test(id))?.[0];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      plugins: [
        ['@lingui/swc-plugin', {}],
        ['@swc-jotai/debug-label', {}],
        ['@swc-jotai/react-refresh', {}]
      ]
    }),
    lingui(),
    splitVendorChunkPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: createManualChunks({
          'vendor-graph':
            /\/sigma|@yomguithereal\/helpers|events|graphology|mnemonist|obliterator|pandemonium/
        })
      }
    }
  },
  test: {
    globals: true
  },
  resolve: {
    alias: {
      lodash: path.resolve(__dirname, './src/utils/lodash.ts')
    }
  },
  server: {
    port: 3000
  }
});
