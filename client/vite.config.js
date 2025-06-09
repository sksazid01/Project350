import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    historyApiFallback: true
  },
  plugins: [react()],
});
