import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/serverlms': {
        target: 'https://cs.mkcl.org/1s1b2Prxb0vZ9lAJXJ2X3JGRDYn/o/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/serverlms/, '');
        }
      },
      '/servercpp': {
        target: 'https://cs.mkcl.org/27Q0lT4ds23wVm11plyVxCZVZXV/r/mql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log("[DEBUG] Proxying request:", path); // Should log when a request is proxied
          return path.replace(/^\/servercpp/, '');
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
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log("[DEBUG] Incoming Request:", req.url); // Log every request
      next();
    });
  }

})
