import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    externalizeDeps({
      deps: ['@emailjs/browser']
    }),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      external: ['/src/main.tsx', '@emailjs/browser']
    },
    // For Netlify deployment
    outDir: 'dist',
    // Use relative paths for assets
    assetsDir: 'assets',
    // Ensure clean URLs work properly
    emptyOutDir: true
  }
})); 