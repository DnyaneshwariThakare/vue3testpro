import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("Proxying request:", path);
          return path.replace(/^\/api/, '');
        }
      },
      '/serverlms': {
        target: 'https://cs.mkcl.org/1s1b2Prxb0vZ9lAJXJ2X3JGRDYn/o/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/serverlms/, '');
        }
      },
      '/servercppr': {
        target: 'https://cs.mkcl.org/27Q0lT4ds23wVm11plyVxCZVZXV/r/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/servercppr/, '');
        }
      },
      '/servercppo': {
        target: 'https://cs.mkcl.org/27Q0lT4ds23wVm11plyVxCZVZXV/o/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/servercppo/, '');
        }
      },
      '/locationApi': {
        target: 'https://cs.mkcl.org/283Xh10DC7hyeuraYTUDNFY7PF5/o/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/locationApi/, '');
        }
      }
    },

  },

})
