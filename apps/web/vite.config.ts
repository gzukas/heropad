/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

function createManualChunks(chunks: Record<string, RegExp>) {
  const chunkEntries = Object.entries(chunks);
  return (id: string) => chunkEntries.find(([, re]) => re.test(id))?.[0];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    splitVendorChunkPlugin(),
    lingui()
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
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts']
  },
  server: {
    port: 3000
  }
});
