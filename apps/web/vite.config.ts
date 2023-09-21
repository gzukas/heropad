import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { lingui } from '@lingui/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    lingui()
  ],
  server: {
    port: 3000
  }
});
