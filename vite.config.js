/* eslint-disable object-curly-newline */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    svgr({
      exportAsDefault: false, // đảm bảo ReactComponent được export
      svgrOptions: {
        icon: true
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: '/src',
      },
    ],
  },
  server: {
    fs: {
      deny: ['.env', '/secret']
    }
  }
});
