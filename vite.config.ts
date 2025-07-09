
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate files with predictable names for WordPress integration
    rollupOptions: {
      output: {
        // Ensure CSS and JS have consistent naming
        entryFileNames: 'assets/chroma-ui.js',
        chunkFileNames: 'assets/chroma-ui-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/chroma-ui.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    },
    // Ensure the build works in different environments
    target: 'es2015',
    // Generate source maps for debugging
    sourcemap: false,
    // Optimize for production
    minify: 'terser'
  },
  // Configure base URL for WordPress deployment
  base: mode === 'production' ? '/wp-content/plugins/chroma-ui/assets/' : '/',
}));
