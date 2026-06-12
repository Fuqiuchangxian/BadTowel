import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  // 如果部署到子路径，修改 base
  // base: '/badtowel/',
  vite: {
    server: {
      proxy: {
        '/api/mimo': {
          target: 'https://api.xiaomimimo.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/mimo/, ''),
        },
      },
    },
  },
});
